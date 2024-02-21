module.exports = {
  "siteMetadata": {
    "title": "Domino Data Lab Documentation (Split Version)",
    "description": "",
    "author": "",
    "siteUrl": "https://docs.dominodatalab.com/",
    "contentRepositoryUrl": "https://github.com/cerebrotech/documentation-split-content/edit/main/"
  },
  "plugins": [
    {
      "resolve": "gatsby-source-filesystem",
      "options": {
        "name": "pages",
        "path": "/site/src"
      }
    },
    {
      "resolve": "gatsby-source-filesystem",
      "options": {
        "name": "docs",
        "path": "/site/content/"
      }
    },
    {
      "resolve": "gatsby-transformer-asciidoc",
      "options": {
        "attributes": {
          "showtitle": true,
          "icons": "font"
        },
        "fileExtensions": [
          "adoc",
          "md"
        ]
      }
    },
    "gatsby-plugin-postcss"
  ]
}