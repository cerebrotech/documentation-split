import React from "react"
import { graphql } from "gatsby"

import Layout from "../layouts"

export const Head = ({ location, data }) => (
  <>
    <title>{data.asciidoc.document.title}</title>
  </>
)

class Article extends React.Component {
  render() {
    const editUrl = `${this.props.data.site.siteMetadata.contentRepositoryUrl}${this.props.data.asciidoc.fields.path}`;
    return (
      <Layout>
        <div dangerouslySetInnerHTML={{ __html: this.props.data.asciidoc.html }} />
        <a href={editUrl}>Edit this page</a>
      </Layout>
    )
  }
}

export default Article

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        contentRepositoryUrl
      }
    }
    asciidoc(id: { eq: $id }) {
      html
      document {
        title
        subtitle
        main
      }
      fields {
        path
      }
    }
  }
`
