import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../layouts";

function IndexPage(props) {
  return (
    <Layout>
      <div>
        <ul>
          <li><Link to="/5.9/user-guide/">User Guide</Link></li>
          <li><Link to="/5.9/admin-guide/">Admin Guide</Link></li>
          <li><Link to="/5.9/api-guide/">API Guide</Link></li>
        </ul>
      </div>
    </Layout>
  );
}

export default IndexPage;

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
          version
        }
      }
    }
  }
`;
