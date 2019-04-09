import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import StackCard from "../components/stacks/stack-card"
import logomarkImage from "../images/awesome-stacks-logo-sunglasses.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const IndexPage = ({
  data: {
    site: { siteMetadata: { title, description, contributing, repository } },
    allGithubContributors,
    allMarkdownRemark
  },
}) => {
  const Stacks = allMarkdownRemark.edges[0].node.fields.stacks.map(stack =>
    <div key={stack.name} className="container has-margin-top-50 has-margin-bottom-50">
      <StackCard stack={stack} />
    </div>
  );
  const Contributors = allGithubContributors.edges
    .filter(edge => edge.node.login)
    .map(({ node: { login, avatar_url, html_url } }) => (
      <div key={login} className="column is-4-mobile is-2-tablet has-text-centered has-overflow-hidden" >
        <a href={html_url}>
          <img alt={login} className="is-avatar-image" src={avatar_url} />
          <div className="is-size-7">@{login}</div>
        </a>
      </div>))
  return (
    <Layout>
      <SEO title={title} titleTemplate={`%s`} keywords={[`awesome`, `techstack`, `stackshare`]} />
      <div className="hero has-background-blue-gradient has-text-centered" style={{ paddingTop: "1.8rem", paddingBottom: "1.0rem" }}>
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered is-multiline">
              <div className="column is-12">
                <img src={logomarkImage} alt="Pink slotted sunglasses" style={{ height: "105px" }}></img>
                <h1 className="is-size-hero-title has-text-white has-margin-top-5 has-margin-bottom-20">
                  Stacks on Stacks
                </h1>
              </div>
              <div className="column is-8 is-paddingless">
                <p className="is-size-4 has-text-white">{description}</p>
              </div>
            </div>
            <div className="columns is-centered has-margin-top-30">
              <div className="column">
                <a className="button is-borderless has-grey-lighter-hover" style={{ boxShadow: "0 0 0 none" }} href={repository}>
                  <FontAwesomeIcon icon={["fab", "github"]} />
                  <span>&nbsp;&nbsp;View on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        {Stacks}
      </div>
      <div className="has-background-grey has-padding-top-20 has-padding-bottom-20">
        <div className="has-text-centered">
          <h3 className="is-size-3 has-text-white">——— Contributors ———</h3>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {Contributors}
          </div>
          <div className="columns is-centered has-margin-top-60">
            <div className="column is-narrow has-text-centered">
              <a className="button is-danger is-uppercase" href={contributing}>Become a contributor!</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>);
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        repository
        contributing
      }
    }
    allMdx(
      sort: { order: DESC, fields: [frontmatter___createdAt] },
      filter: { fields: { sourceName: { eq: "content-stacks" } } }
      ) {
      edges {
        node {
          ...MdxFields
        }
      }
    }
    allMarkdownRemark(
      filter: { fields: { sourceName: { eq: "readme-stacks" } } }
      ) {
      edges {
        node {
          ...MarkdownRemarkFields
        }
      }
    }
    allGithubContributors {
      edges {
        node {
          login
          html_url
          avatar_url
        }
      }
    }
  }
`

export const MarkdownRemarkFields = graphql`
  fragment MarkdownRemarkFields on MarkdownRemark {
    fields {
      stacks {
        name
        path
        description
        url
        tools {
          name
          description
          url
          gitHubUrl 
          stackShareUrl
          stackShareData {
            name
            imageUrl
          }
          gitHubData {
            name
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
    }
  }
`;

export const mdxQuery = graphql`
  fragment MdxFields on Mdx {
    id
    parent {
      ... on File {
        name
      }
    }
    frontmatter {
      title
      description
      createdAt(formatString: "MMMM D, YYYY")
      updatedAt(formatString: "MMMM D, YYYY")
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
              url
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

export default IndexPage
