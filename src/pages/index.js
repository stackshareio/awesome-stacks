import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import StackCard from "../components/stack-card"
import Contributors from "../components/contributors";

const IndexPage = ({
  data: {
    site: { siteMetadata: { title, description } },
    allMdx: { edges },
  },
}) => {
  const StackCards = edges.map(edge =>
    <div key={edge.node.id} className="container">
      <StackCard node={edge.node} />
      <div className="has-margin-bottom-40"></div>
      <div className="has-margin-bottom-40 has-dotted-line"></div>
    </div>
  );
  const contributors = getContributors(edges);
  return (
    <Layout>
      <SEO title={title} titleTemplate={`%s`} keywords={[`awesome`, `techstack`, `stackshare`]} />
      <div className="hero is-medium is-bold has-background-danger has-text-centered">
        <div className="hero-body">
          <div className="columns is-centered is-multiline">
            <div className="column is-12">
              <h1 className="is-size-hero-title has-text-white">
                Stacks on Stacks
              </h1>
            </div>
            <div className="column is-4">
              <p className="is-size-larger has-text-white">{description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="has-background-grey has-padding-top-20 has-padding-bottom-20">
        <div className="has-text-centered">
          <h3 className="is-size-3 has-text-white">——— Featured Stacks ———</h3>
        </div>
      </div>
      <div className="section">
        {StackCards}
        <div className="has-margin-bottom-20"></div>
      </div>
      <div className="has-background-grey has-padding-top-20 has-padding-bottom-20">
        <div className="has-text-centered">
          <h3 className="is-size-3 has-text-white">——— Contributors ———</h3>
        </div>
      </div>
      <div className="has-margin-top-20">
        <Contributors contributors={contributors} />
        <div className="has-margin-bottom-40"></div>
      </div>
    </Layout>);
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { fields: { sourceName: { eq: "stacks" } } }
      ) {
      edges {
        node {
          ...MdxFields
        }
      }
    }
  }
`

export const mdxQuery = graphql`
  fragment MdxFields on Mdx {
    id
    parent {
      ... on File {
        name
        modifiedTime(formatString: "MMMM D, YYYY")
      }
    }
    frontmatter {
      title
      description
      date(formatString: "MMMM D, YYYY")
    }
    code {
      body
    }
    fields {
      contributors {
        login
        name
        avatarUrl
        url
      }
      stackShareTools {
        name
        fullName
        tagline
        logo
        website
        url
        gitHubURL
        category {
          name
          url
        }
        group {
          name
          url
        }
        stackShareStats {
          name
          value
        }
        gitHubStats {
          name
          value
          dateValue
        }
      }
      gitHubTools {
        name
        nameWithOwner
        description
        descriptionHTML
        stargazers {
          totalCount
        }
        repositoryTopics {
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
        languages {
          edges {
            node {
              name
              color
            }
          }
        }
      }
    }
  }
`

function getContributors(edges) {
  var array = [];
  edges.forEach((edge) => {
    const contributors = edge.node.fields.contributors;
    contributors.forEach((contributor) => {
      array.push(contributor);
    });
  });
  return Object.values(array.reduce((memo, contributor) => {
    memo[contributor.login] = contributor;
    return memo;
  }, {}));
}

export default IndexPage
