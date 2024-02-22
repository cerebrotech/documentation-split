import React, { useState, useEffect } from "react";
import { Link, graphql, navigate } from "gatsby";

import Layout from "../layouts";

function IndexPage(props) {
  return (
    <Layout>
      <div>
        <ul>
          <li><Link to="/user-guide/5.9/">User Guide</Link></li>
          <li><Link to="/admin-guide/5.9/">Admin Guide</Link></li>
          <li><Link to="/api-guide/5.9/">API Guide</Link></li>
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
