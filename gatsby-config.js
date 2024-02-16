module.exports = {
  siteMetadata: {
    title: `WhimsyWeb`,
    description: `WhimsyWeb is your go-to whimsical web-building wizard, turning the mundane task of site creation into a delightful endeavor. With a dash of humor and a sprinkle of ease, it transforms your web development journey into an engaging adventure.`,
    author: `Whimsyweb`,
    siteUrl: `https://www.whimsyweb.dev/`,
    contentRepositoryUrl: `https://github.com/cerebrotech/documentation-split-content/edit/main/`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "docs",
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-asciidoc`,
      options: {
        attributes: {
          showtitle: true,
          icons: "font"
        },
        fileExtensions: [`adoc`, `md`],
      },
    },
    'gatsby-adapter-netlify',
    'gatsby-plugin-postcss'
  ],
}
