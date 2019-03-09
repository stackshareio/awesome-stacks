import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'

const PostLink = ({ post }) => (
  <div>
    <Link to={post.frontmatter.path}>
      {post.frontmatter.title}
    </Link>
  </div>
)

const IndexPage = ({
  data: {
    allMdx: { edges },
  },
}) => {
  const Posts = edges.map(edge => <PostLink key={edge.node.id} post={edge.node} />)
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
          id
          frontmatter {
            path
            title
          }
        }
      }
    }
  }
`

export default IndexPage
