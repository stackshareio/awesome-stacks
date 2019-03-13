import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import StackCard from "../components/stack-card"
import About from "../snippets/about"

const AboutMessage = ({ title }) => {
  return (
    <div className="columns is-centered">
      <div className="column is-10">
        <div className="message">
          <div className="message-body">
            <h1 className="is-size-3 has-margin-bottom-10">About {title}</h1>
            <div className="content">
              <About />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
    </div>
  );
  return (
    <Layout>
      <SEO title="Home" keywords={[`awesome`, `techstack`, `stackshare`]} />
      <div className="hero is-medium is-bold has-background-danger has-text-centered">
        <div className="hero-body">
          <div className="columns is-centered is-multiline">
            <div class="column is-12">
              <h1 className="is-size-1 has-text-white">Stacks on Stacks</h1>
            </div>
            <div className="column is-4">
              <h4 className="is-size-5 has-text-white">{description}</h4>
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
        <div className="has-margin-top-40"></div>
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
      }
    }
    fields {
      stackShareTools {
        name
        website
      }
      gitHubTools {
        name
        repoName
        source
        url
      }
    }
    frontmatter {
      title
      description
      contributors {
        name
        url
      }
    }
  }
`

export default IndexPage
