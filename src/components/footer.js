import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Footer = () => (
  <StaticQuery
    render={data => {
      return (
        <footer className="hero has-background-grey has-text-white">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column has-text-centered">
                  <div className="is-uppercase is-size-7" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <span style={{ display: "inline-block", paddingRight: "10px" }}>Made with ♥ by </span>
                    <a href="https://stackshare.io/">
                      <Img fixed={data.footerImage.childImageSharp.fixed} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      );
    }
    }
    query={graphql`
      query {
        footerImage: file(relativePath: { eq: "stackshare-logo-black.png" }) {
          childImageSharp {
            fixed(height: 24) {
              ...GatsbyImageSharpFixed_noBase64
            }
          }
        }
      }`}
  />
)

export default Footer