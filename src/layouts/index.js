import React from "react"
import { StaticQuery, graphql } from "gatsby"

// CAN WE DELETE ../util/fetchVersions???
// CAN WE DELETE ../util/fetchVersions???
// CAN WE DELETE ../util/fetchVersions???
// CAN WE DELETE ../util/fetchVersions???
// CAN WE DELETE ../util/fetchVersions???

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVersion: ''
    };
  }

  handleVersionChange = (event) => {
    this.setState({ selectedVersion: event.target.value });
  };

  render() {
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
        render={data => {
          const versions = Array.from(new Set(data.allAsciidoc.nodes.map(node => parseFloat(node.fields.version)))).sort((a, b) => b - a);
          const selectedVersion = this.state.selectedVersion ? this.state.selectedVersion : Math.max(...versions);
          return (
          <div className="prose lg:prose-lg my-0 max-w-full">
            {selectedVersion}
            <div className="p-3 text-center bg-black">
              <h2 id="heading" className="text-white">{data.site.siteMetadata.title}</h2>
            </div>
            <div className="flex">
              <div id="nav-left" className="flex-1" style={{ flex: '0 0 20%' }}>
                <label htmlFor="version-selector">Select Version:</label>
                <select id="version-selector" value={selectedVersion} onChange={this.handleVersionChange}>
                  {versions.map((version, index) => (
                    <option key={index} value={version}>{version}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1" style={{ flex: '0 0 80%' }}>
                <div className="pt-6 max-w-3xl">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
          );
        }}
      />
    )
  }
}

export default DefaultLayout
