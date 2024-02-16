import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../layouts"

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div>
          <ul>
            {this.props.data.allAsciidoc.nodes.map((node) => (
              <li key={node.id}>
                <Link to={node.fields.slug}>{node.pageAttributes.title}</Link> ({node.fields.slug})
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allAsciidoc {
      nodes {
        id
        html
        pageAttributes {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`
