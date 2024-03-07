// Parses paths in the following formats:
//
// - /5.9/user-guide/
// - 5.9/user-guide/
//
// and extracts the version number.
//
const getVersion = (path) => {
    const match = /^\/?([^/]+)\/.*$/.exec(path.replace(/.*\/content/, "") );
    return match ? match[1] : null;
}
  
module.exports = getVersion;