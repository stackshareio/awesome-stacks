require('dotenv').config({ path: '.env.development' });

module.exports = {
  siteMetadata: {
    title: `Awesome Stacks`,
    url: `https://awesomestacks.dev`,
    description: `Discover awesome tech stacks for building different applications and features.`,
    image: `/images/awesome-stacks-twitter-card-large.png`,
    imageWidth: 1688,
    imageHeight: 883,
    author: `@dzello`,
    repository: `https://github.com/stackshareio/awesome-stacks`,
    contributing: `https://github.com/stackshareio/awesome-stacks/blob/master/CONTRIBUTING.md`,
    techStack: `https://stackshare.io/stackshare/awesome-stacks`
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
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `content-docs`,
    //     path: `${__dirname}/content/docs`,
    //   },
    // },
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
    `gatsby-transform-stacks`,
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        url: `https://api.github.com/repos/stackshareio/awesome-stacks/contributors`,
        name: "githubContributors"
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-41067622-2`,
        respectDNT: true
      }
    }
  ]
}
