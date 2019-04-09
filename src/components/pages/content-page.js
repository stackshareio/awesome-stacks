import React from "react"
import { graphql } from "gatsby"
import Layout from "../layout"
import SEO from "../seo"
import { MDXTag } from '@mdx-js/tag';
import Img from "gatsby-image";
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
                <MDXRenderer scope={{ React, MDXTag, Img, data }}>
                  {data.mdx.code.body}
                </MDXRenderer>
              </div>
            </div>
          </div>
          <div className="has-margin-top-60"></div>
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
        ...GatsbyImageSharpFixed_noBase64
      }
    }
  }
  developerModeLogo: file(relativePath: { eq: "developermode-logo.png" }) {
    childImageSharp {
      fixed(height: 28) {
        ...GatsbyImageSharpFixed_noBase64
      }
    }
  }
}`;

export default ContentPage
