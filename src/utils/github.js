const { ApolloClient } = require("apollo-boost")
const { HttpLink } = require("apollo-link-http")
const { InMemoryCache } = require("apollo-cache-inmemory")
const fetch = require("node-fetch")
const gql = require("graphql-tag")

function getApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://api.github.com/graphql",
      fetch,
      headers: {
        Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    }),
    cache: new InMemoryCache(),
  })
}

module.exports = {
  getGitHubTool: function ({ owner, name }) {
    if (!owner || !name) {
      return
    }
    return getApolloClient()
      .query({
        variables: { owner, name },
        query: gql`
          query($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
              name
              nameWithOwner
              description
              descriptionHTML
              stargazers {
                totalCount
              }
              repositoryTopics(first: 3) {
                edges {
                  node {
                    topic {
                      name
                    }
                  }
                }
              }
              forks {
                totalCount
              }
              updatedAt
              url
              homepageUrl
              languages(first: 1) {
                edges {
                  node {
                    name
                    color
                  }
                }
              }
            }
          }
        `,
      })
      .then(({ data: { repository } }) => {
        return repository
      })
      .catch(err => {
        console.error(err)
        return
      })
  },

  getGitHubUser: function (login) {
    return getApolloClient()
      .query({
        variables: { login },
        query: gql`
          query($login: String!) {
            user(login: $login) {
              login
              name
              avatarUrl
              url
            }
          }
        `,
      })
      .then(({ data: { user } }) => {
        return user
      })
      .catch(err => {
        console.error(err)
        return
      })
  },
}
