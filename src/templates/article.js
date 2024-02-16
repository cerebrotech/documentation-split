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
        <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
          <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            {this.props.data.asciidoc.author && (
              <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                {this.props.data.asciidoc.author.fullName} ({this.props.data.asciidoc.author.email})
              </span>
            )}
            {this.props.data.asciidoc.revision && (
              <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                v{this.props.data.asciidoc.revision.number} ({this.props.data.asciidoc.revision.date})
              </span>
            )}
          </div>
        </footer>
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
      revision {
        date
        number
        remark
      }
      author {
        fullName
        firstName
        lastName
        middleName
        authorInitials
        email
      }
    }
  }
`
