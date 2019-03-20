import React from "react"
import { graphql } from "gatsby";
import Layout from "../layout"
import SEO from "../seo"
import MDXRenderer from "gatsby-mdx/mdx-renderer";

function DocsLayout({ data }) { 
  return (
    <Layout>
      <SEO title={data.mdx.frontmatter.title} />
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-9">
              <div className="content">
                <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
              </div>
            </div>
            <div className="column is-3">
              <div className="box grey-box is-fixed">
                <div className="is-size-5 is-uppercase">Contents</div>
                <ul>
                  <li><a href="#overview">&rsaquo; Overview</a></li>
                  <li><a href="#setup">&rsaquo; Setup</a></li>
                  <li><a href="#createastack">&rsaquo; Create a stack</a></li>
                  <li><a href="#addtools">&rsaquo; Add tools</a></li>
                  <li><a href="#review">&rsaquo; Review</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
)}

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
export default DocsLayout
