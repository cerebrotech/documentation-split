const _ = require(`lodash`)
const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const fetchVersions = require('./src/util/get-versions');

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
