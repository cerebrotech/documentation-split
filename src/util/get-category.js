// Parses paths in the following formats:
//
// - /5.9/user-guide/
// - 5.9/user-guide/
//
// and extracts the category.
//
const getCategory = (path) => {
    const parts = path.replace(/^\/|\/$/g, '').split('/');
    return parts.length >= 2 ? parts[1] : null;
}
  
module.exports = getCategory;