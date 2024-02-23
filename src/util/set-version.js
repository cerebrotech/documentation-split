const setVersion = (path, version) => {
    return path.replace(/^\/([^/]+)(\/.*)$/, `/${version}$2`);
}

module.exports = setVersion;