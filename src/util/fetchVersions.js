const fetchVersions = async (graphql) => {
    const result = await graphql(`
        query {
            allAsciidoc {
                nodes {
                    fields {
                        version
                    }
                }
            }
        }
    `);

    return [...new Set(result.data.allAsciidoc.nodes.map(node => parseFloat(node.fields.version)))];
};

module.exports = fetchVersions;