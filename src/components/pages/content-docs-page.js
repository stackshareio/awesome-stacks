import React from "react"
import { graphql } from "gatsby";
import Layout from "../layout"
import SEO from "../seo"
import MDXRenderer from "gatsby-mdx/mdx-renderer";

function ContentDocsPage({ data }) {
  return (
    <Layout>
      <SEO title={data.mdx.frontmatter.title} />
      <div className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-9">
              <div className="content">
                <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`
export default ContentDocsPage
