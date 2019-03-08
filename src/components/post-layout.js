import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <header>
          <h1>{data.mdx.frontmatter.title}</h1>
        </header>
        <div>
          <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
        </div>
      </div>
    </Layout>
  )
}

// src/components/posts-page-layout.js
export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`;
// export const pageQuery = graphql`
//   query($postRoute: String!) {
//     mdx(fields: { route: { eq: $postRoute } }) {
//       frontmatter {
//         title
//       }
//       fields {
//         route
//       }
//       rawBody
//       internal {
//         content
//       }
//       code {
//         body
//         scope
//       }
//     }
//   }
// `
