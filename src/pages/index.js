import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import StackCard from "../components/stack-card"
import About from "../snippets/about"

const IndexPage = ({
  data: {
    site: { siteMetadata: { title } },
    allMdx: { edges },
  },
}) => {
  const StackCards = edges.map(edge =>
    <div key={edge.node.id} class="column is-4 is-3-widescreen">
      <StackCard node={edge.node} />
    </div>
  );
  return (
    <Layout>
      <SEO title="Home" keywords={[`awesome`, `techstack`, `stackshare`]} />
      <div class="section">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-10">
              <div class="message">
                <div class="message-body">
                  <h1 class="is-size-3 has-margin-bottom-10">About {title}</h1>
                  <div class="content">
                    <About />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="has-margin-top-40"></div>
          <div class="columns is-centered">
            <div class="column has-text-centered">
              <h1 class="is-size-3">Stacks</h1>
            </div>
          </div>
          <div class="columns is-multiline is-centered">
            {StackCards}
          </div>
        </div>
        <div class="has-margin-top-40"></div>
      </div>
    </Layout>);
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
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
