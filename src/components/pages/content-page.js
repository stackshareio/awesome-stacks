import React from "react"
import { graphql } from "gatsby"
import Layout from "../layout"
import SEO from "../seo"
import Img from "gatsby-image"
import MDXRenderer from "gatsby-mdx/mdx-renderer";

function ContentPage({ data }) {
  return (
    <Layout>
      <SEO title={data.mdx.frontmatter.title} />
      <div className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-9">
              <div className="content">
                <MDXRenderer data={data}>{data.mdx.code.body}</MDXRenderer>
              </div>
              <div className="level has-margin-top-40">
                <div className="level-item">
                  <a href="https://stackshare.io/">
                    <Img fixed={data.stackShareLogo.childImageSharp.fixed} />
                  </a>
                </div>
                <div className="level-item">
                  <a href="https://developermode.com/">
                    <Img fixed={data.developerModeLogo.childImageSharp.fixed} />
                  </a>
                </div>
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
  site {
    siteMetadata {
      repository
      techStack
    }
  }
  stackShareLogo: file(relativePath: { eq: "stackshare-logo.png" }) {
    childImageSharp {
      fixed(height: 28) {
        ...GatsbyImageSharpFixed
      }
    }
  }
  developerModeLogo: file(relativePath: { eq: "developermode-logo.png" }) {
    childImageSharp {
      fixed(height: 28) {
        ...GatsbyImageSharpFixed
      }
    }
  }
}`;

export default ContentPage
