import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../layouts"

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="text-center">      
          <p className="w-full text-left">Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file. It's fast, flexible, and reliable with zero-runtime.</p>
          <button className="bg-sky-600 hover:bg-sky-700 px-5 py-3 text-white rounded-lg">BUTTON EXAMPLE</button>
        </div>
        <div>
          <h3>Other Pages</h3>
          <ul>
            {this.props.data.allAsciidoc.edges.map(({ node }) => (
              <li key={node.id}>
                <Link to={node.fields.slug}>{node.document.title}</Link>
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
      edges {
        node {
          id
          html
          document {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
