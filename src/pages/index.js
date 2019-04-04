import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Category from "../components/stacks/category"
import logomarkImage from "../images/awesome-stacks-logo-sunglasses.svg"

const IndexPage = ({
  data: {
    site: { siteMetadata: { title, description, contributing } },
    allGithubContributors,
    allMarkdownRemark
  },
}) => {
  const Categories = allMarkdownRemark.edges[0].node.fields.categories.map(category =>
    <div key={category.name} className="container">
      <Category category={category} />
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
      <div className="hero is-info has-text-centered" style={{ paddingTop: "1.8rem", paddingBottom: "2.2rem", background: "linear-gradient(90deg, rgba(8,31,50,1) 0%, rgba(19,58,89,1) 50%, rgba(24,84,130,1) 100%)" }}>
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
          </div>
        </div>
      </div>
      <div className="section">
        {Categories}
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
          <div className="columns is-centered">
            <div className="column is-narrow has-text-centered">
              <a className="button is-danger is-uppercase" href={contributing}>Become a contributor!</a>
            </div>
          </div>
          <div className="has-margin-top-20"></div>
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
      categories {
        name
        path
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
