import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Footer = () => (
  <StaticQuery
    render={data => {
      return (
        <footer className="hero is-light">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-half has-text-centered">
                  <div className="has-margin-bottom-20">Made with 💙 by</div>
                  <div>
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
        footerImage: file(relativePath: { eq: "stackshare-logo.png" }) {
          childImageSharp {
            fixed(height: 32) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }`}
  />
)

export default Footer