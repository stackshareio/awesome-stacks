import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Footer = () => (
  <StaticQuery
    render={data => {
      return (
        <footer class="hero is-light">
          <div class="hero-body">
            <div class="container">
              <div class="columns is-centered">
                <div class="column is-half has-text-centered">
                  <div class="has-margin-bottom-20">
                    Made with
                    <span role="img" aria-label="blue-heart">💙</span>
                    by
                  </div>
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