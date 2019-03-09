import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

const Navbar = ({ }) => (
  <StaticQuery
    query={graphql`
      query {
        brandImage: file(relativePath: { eq: "awesome-logo.png" }) {
          childImageSharp {
            fixed(height: 32) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        site {
          siteMetadata {
            title
          }
        }
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
      }`}
    render={data => {
      const Tags = data.allMdx.edges.map(edge => <Link className="tag is-medium" key={edge.node.id} to={edge.node.frontmatter.path}>{edge.node.frontmatter.title}</Link>);
      return (
        <div className="nav navbar is-fixed-top has-shadow has-background-white">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <Img fixed={data.brandImage.childImageSharp.fixed} />
                <div className="is-size-4 has-margin-left-10">
                  {data.site.siteMetadata.title}
                </div>
              </a>
              <div className="span navbar-burger burger" data-target="navbarMenuHeroA">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="navbar-menu" id="#navbarMenuHeroA">
              <div className="navbar-end">
                <div className="navbar-item has-dropdown is-active">
                  <a className="navbar-link">🔥 &nbsp; Stacks</a>
                  <div className="navbar-dropdown" style={{ width: "300px" }}>
                    <div className="navbar-item">
                      <div className="tags">
                        {Tags}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="navbar-item">
                  <a className="button is-rounded is-danger" href="/contributing">Contribute</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    }
  />
)

export default Navbar