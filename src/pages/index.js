import React, { useState, useEffect } from "react";
import { Link, graphql, navigate } from "gatsby";

import Layout from "../layouts";

function IndexPage(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");

  const handleChange = (event) => {
    const value = event.target.value
    setSelectedOption(value)
    navigate(`/test`)
  }

  useEffect(() => {
    // Here you can perform any side effects such as fetching data or updating state
    // This effect runs when the component mounts or when `selectedOption` changes
    // For now, let's just set selectedVersion based on selectedOption
    if (selectedOption === "A") {
      setSelectedVersion("Version A");
    } else if (selectedOption === "B") {
      setSelectedVersion("Version B");
    } else if (selectedOption === "C") {
      setSelectedVersion("Version C");
    }
  }, [selectedOption]);

  return (
    <Layout>
      <select value={selectedOption} onChange={handleChange}>
        <option value="">Select</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
        <option value="C">Option C</option>
      </select>
      <div>
        PPP{selectedVersion}QQQ
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
