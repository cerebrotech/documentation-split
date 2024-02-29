const fs = require('fs');
const yaml = require('js-yaml');

const readYaml = (filePath) => {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(fileContents);
    return data;
  } catch (e) {
    console.error(`Failed to read or parse YAML file at ${filePath}:`, e);
    return null;
  }
};

module.exports = readYaml;