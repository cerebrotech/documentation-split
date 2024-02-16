const _ = require(`lodash`)
const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
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
        },
      })
    })
  })
}

exports.onCreateNode = async ({ node, actions, getNode, loadNodeContent }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Asciidoc`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}