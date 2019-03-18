require('dotenv').config({ path: '.env.development' });

module.exports = {
  siteMetadata: {
    title: `Awesome Stacks`,
    description: `Discover working tech stacks for all kinds of applications.`,
    author: `@dzello`,
    repository: `https://github.com/dzello/awesome-stacks`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `stacks`,
        path: `${__dirname}/src/stacks`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `snippets`,
        path: `${__dirname}/src/snippets`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve(`./src/components/no-layout.js`),
          pages: require.resolve(`./src/components/layout.js`),
        },
      },
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        class: 'has-navbar-fixed-top'
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Roboto+Condensed:700`
        ]
      }
    },
    `gatsby-plugin-favicon`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
