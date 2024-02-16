import React from "react"
import { graphql } from "gatsby"

import Layout from "../layouts"

export const Head = ({ location, data }) => (
  <>
    <title>{data.asciidoc.document.title}</title>
    <meta property="og:type" content="website" data-react-helmet="true"></meta>
    <meta name="twitter:url" content={`https://www.example.com/${location.pathname}`} />
  </>
)

class Article extends React.Component {
  render() {
    return (
      <Layout>
        <div dangerouslySetInnerHTML={{ __html: this.props.data.asciidoc.html }} />
        <a
        href={`https://github.com/cerebrotech/documentation/tree/main/content/`}
      >Edit this page
      </a>
      </Layout>
    )
  }
}

export default Article

export const pageQuery = graphql`
  query($id: String!) {
    asciidoc(id: { eq: $id }) {
      html
      document {
        title
        subtitle
        main
      }
    }
  }
`
