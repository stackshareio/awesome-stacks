import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'

const PostLink = ({ node }) => (
  <div>
    <Link to={node.parent.name}>
      {node.frontmatter.title}
    </Link>
  </div>
)

const IndexPage = ({
  data: {
    allMdx: { edges },
  },
}) => {
  const Posts = edges.map(edge => <PostLink key={edge.node.id} node={edge.node} />)
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      {Posts}
    </Layout>);
}

export const pageQuery = graphql`
  query {
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
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
    }
  }
`

export default IndexPage
