const _ = require(`lodash`)
const fs = require(`fs`)
const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const fetchVersions = require('./src/util/get-versions');
const readYaml = require('./src/util/read-yaml');
const getVersion = require('./src/util/get-version');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type SiteStructure implements Node @dontInfer {
      id: ID!
      version: String!
      structure: JSON!
    }
  `;
  createTypes(typeDefs);
};

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  // Define the path to the content folder
  const contentDirectory = path.resolve('./content');

  // Read all structure.yml files from a directory.
  const readYAMLFiles = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat && stat.isDirectory()) {
        readYAMLFiles(filePath); // Recursively read from subdirectories.
      } else if (file === 'structure.yml') {
        const data = readYaml(filePath);

        const version = getVersion(filePath);

        console.log("Create YAML node.")
        const yamlNode = {
          ...data,
          id: createNodeId(`structure-${filePath}`),
          parent: null,
          version: version,
          children: [],
          internal: {
            type: 'SiteStructure',
            contentDigest: createContentDigest(data),
          },
          structure: JSON.stringify(data),
        };
        yamlNode.internal.contentDigest = createContentDigest(yamlNode);
        createNode(yamlNode);
      };
    })
  };

  readYAMLFiles(contentDirectory);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const versions = await fetchVersions(graphql);

  return graphql(
    `
      {
        allAsciidoc {
          nodes {
            id
            fields {
              slug
              version
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const articleTemplate = path.resolve(`./src/templates/article.js`)
    _.each(result.data.allAsciidoc.nodes, node => {
      createPage({
        path: node.fields.slug,
        component: slash(articleTemplate),
        context: {
          id: node.id,
          versions,
          version: node.fields.version,
        },
      })
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/result/)) {
    page.matchPath = "/result/:option"
    createPage(page)
  }
}

exports.onCreateNode = async ({ node, actions, getNode, loadNodeContent }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Asciidoc`) {
    const slug = createFilePath({ node, getNode })

    const parts = slug.replace(/^\/|\/$/g, '').split('/');

    const section = parts[1];
    const version = parts[0];

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
    const filePath = getNode(node.parent).relativePath
    createNodeField({
      node,
      name: 'path',
      value: filePath,
    })
    createNodeField({
      name: `section`,
      node,
      value: section,
    })
    createNodeField({
      name: `version`,
      node,
      value: version,
    })
  }
}
