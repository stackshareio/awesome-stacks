import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import About from "../snippets/about"
import Img from "gatsby-image"

const AboutPage = () => {
  const data = useStaticQuery(query);
  return (
    <Layout>
      <SEO title="About" />
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-10">
              <div className="content">
                <About />
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

const query = graphql`
query {
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

export default AboutPage
