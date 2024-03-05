import React from "react"
import { graphql } from "gatsby"
import { FaGithub } from "react-icons/fa";

import Layout from "../layouts"
import getCategory from "../util/get-category";
import NestedList from "../components/nested-list";

export const Head = ({ location, data }) => (
  <>
    <title>{data.asciidoc.document.title}</title>
  </>
)

class Article extends React.Component {
  render() {
    const { id, versions, version } = this.props.pageContext;
    const editUrl = `${this.props.data.site.siteMetadata.contentRepositoryUrl}${this.props.data.asciidoc.fields.path}`;

    const category = getCategory(this.props.data.asciidoc.fields.path);

    const structure = JSON.parse(this.props.data.siteStructure.internal.content)[category];

    return (
      <Layout>
        <div id="edit-link">
          <a href={editUrl}>
            <FaGithub size={24} className="inline" /> Edit
          </a>
        </div>
        <div dangerouslySetInnerHTML={{ __html: this.props.data.asciidoc.html }} />
        <div className="bg-rose-400">
          <NestedList content={structure.content} />
        </div>
      </Layout>
    )
  }
}

export default Article

export const pageQuery = graphql`
  query($id: String!, $version: String!) {
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
    siteStructure(version: {eq: $version}) {
      id
      version
      internal {
        content
        contentDigest
      }
    }
  }
`
