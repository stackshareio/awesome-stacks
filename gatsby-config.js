module.exports = {
  siteMetadata: {
    title: `Awesome Stacks`,
    description: `Community-curated stacks for solving common problems`,
    author: `@dzello`,
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
          default: require.resolve("./src/components/noLayout.js"),
          pages: require.resolve("./src/components/layout.js"),
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
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Lato:400,400i,700', 'Merriweather:300,700']
        }
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
