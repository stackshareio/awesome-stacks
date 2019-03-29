require('dotenv').config({ path: '.env.development' });

module.exports = {
  siteMetadata: {
    title: `Awesome Stacks`,
    description: `Discover awesome tech stacks for building different applications and features.`,
    author: `@dzello`,
    repository: `https://github.com/stackshareio/awesome-stacks`,
    techStack: `https://stackshare.io/dzello/awesome-stacks`
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
        name: `content-docs`,
        path: `${__dirname}/content/docs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content-stacks`,
        path: `${__dirname}/content/stacks`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `readme-stacks`,
        path: `${__dirname}/README.md`
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        filter: node => node.sourceInstanceName === `readme-stacks`
      },
    },
    `gatsby-mdx`,
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        class: 'has-navbar-fixed-top'
      }
    },
    `gatsby-plugin-favicon`,
    `gatsby-transform-stacks`
  ]
}
