const { ApolloClient } = require("apollo-boost")
const { HttpLink } = require("apollo-link-http")
const { InMemoryCache } = require("apollo-cache-inmemory")
const fetch = require("node-fetch")
const gql = require("graphql-tag")

function getApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://graphql.stackshare.io/",
      fetch,
      headers: {
        Authorization: `Bearer ${process.env.STACKSHARE_ACCESS_TOKEN}`,
      },
    }),
    cache: new InMemoryCache(),
  })
}

module.exports = {
  getStackShareTool: function ({ name }) {
    if (!name) {
      return
    }
    return getApolloClient()
      .query({
        variables: { slug: name },
        query: gql`
          query($slug: String!) {
            tool(slug: $slug) {
              name
              description
              imageUrl
              websiteUrl
              profileUrl
              githubUrl
              group {
                name
                url
              }
              category {
                name
                url
              }
              stackshareStats {
                name
                value
              }
              githubStats {
                name
                value
              }
            }
          }
        `,
      })
      .then(({ data: { tool } }) => {
        return tool
      })
      .catch(err => {
        console.error(err)
        return
      })
  },
}
