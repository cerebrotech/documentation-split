const getVersion = (path) => {
    const match = /^(?:\/[^\/]+\/)([^\/]+)(?:\/.*)$/.exec(path);
    return match ? match[1] : null;
}
  
module.exports = getVersion;