import React, { useState } from "react";
import { StaticQuery, graphql, navigate } from "gatsby"
import { FaHome, FaBook, FaCog, FaCode } from "react-icons/fa";
import { useLocation } from "../util/location";
import setVersion from "../util/set-version";
import getVersion from "../util/get-version";

const DefaultLayout = ({ children }) => {
  const location = useLocation();
  const version = getVersion(location.pathname);

  const [, setSelectedOption] = useState("");

  const handleChange = (event) => {
    const version = event.target.value;
    setSelectedOption(version);
    const url = setVersion(location.pathname, version);
    navigate(url);
  };

  const isLandingPage = () => {
    return location.pathname === "/";
  }

  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
          allAsciidoc {
            nodes {
              fields {
                version
              }
            }
          }
        }
      `}
      render={(data) => {
        const versions = Array.from(new Set(data.allAsciidoc.nodes.map(node => parseFloat(node.fields.version)))).sort((a, b) => b - a);
        const selectedVersion = version ? version : Math.max(...versions);
        return (
          <div className="prose lg:prose-lg my-0 max-w-full">
            <div className="p-3 text-center bg-black">
              <a href="/"><h2 id="heading" className="text-white">{data.site.siteMetadata.title}</h2></a>
            </div>
            <div className="flex">
              <div id="nav-left" className="flex-1" style={{ flex: '0 0 20%' }}>
              <ul className="section-link mb-4">
                <li>
                  <a href="/"><FaHome size={24} className="inline" /> Home</a>
                </li>
                <li>
                  <a href={`/${selectedVersion}/user-guide/`}><FaBook size={24} className="inline" /> User Guide</a>
                </li>
                <li>
                  <a href={`/${selectedVersion}/admin-guide/`}><FaCog size={24} className="inline" /> Admin Guide</a>
                </li>
                <li>
                  <a href={`/${selectedVersion}/api-guide/`}><FaCode size={24} className="inline" /> API Guide</a>
                </li>
              </ul>
                {!isLandingPage() && (
                <div>
                  <label htmlFor="version-selector">Select Version:</label>
                  <select id="version-selector" value={selectedVersion} onChange={handleChange}>
                    {versions.map((version, index) => (
                      <option key={index} value={version}>{version}</option>
                    ))}
                  </select>
                </div>
                )}
              </div>
              <div className="flex-1" style={{ flex: '0 0 80%' }}>
                <div className="pt-6 pl-4 pr-2 max-w-3xl">
                  {children}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default DefaultLayout;
