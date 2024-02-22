const setVersion = (path, version) => {
    return path.replace(/^(\/[^\/]+\/)([^\/]+)(\/.*)$/, `$1${version}$3`);
}
  
module.exports = setVersion;