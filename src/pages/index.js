import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import StackCard from "../components/stackCard"
import About from "../snippets/about"

const IndexPage = ({
  data: {
    allMdx: { edges },
  },
}) => {
  const StackCards = edges.map(edge =>
    <div key={edge.node.id} className="column is-4 is-3-widescreen">
      <StackCard node={edge.node} />
    </div>
  );
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-10">
              <div className="message">
                <div className="message-body">
                  <h1 className="is-size-3 has-margin-bottom-10">About Awesome Stacks</h1>
                  <div className="content">
                    <About />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="has-margin-top-40"></div>
          <div className="columns is-centered">
            <div className="column has-text-centered">
              <h1 className="is-size-3">Stacks</h1>
            </div>
          </div>
          <div className="columns is-multiline is-centered">
            {StackCards}
          </div>
        </div>
        <div className="has-margin-top-40"></div>
      </div>
    </Layout>);
}

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { fields: { sourceName: { eq: "pages" } } }
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
