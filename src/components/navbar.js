import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

function Navbar() {
  const data = useStaticQuery(navbarQuery);
  const Tags = data.allMdx.edges.map(edge => <a className="tag is-medium" key={edge.node.id} href={`/${edge.node.parent.name}`}>{edge.node.frontmatter.title}</a>);
  const [dropdown, setDropdown] = useState(0);
  return (
    <div className="nav navbar is-fixed-top has-shadow has-background-white">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <Img fixed={data.brandImage.childImageSharp.fixed} />
            <div className="is-size-4 has-margin-left-10">
              {data.site.siteMetadata.title}
            </div>
          </Link>
          <div className="span navbar-burger burger" data-target="navbarMenuHeroA">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="navbar-menu" id="#navbarMenuHeroA">
          <div className="navbar-end">
            <div className={`navbar-item has-dropdown ${dropdown}`}
              onClick={() => setDropdown(dropdown === 'is-active' ? '' : 'is-active')}>
              <div className="navbar-link"><span role="img" aria-label="fire">🔥</span> &nbsp; Stacks</div>
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
  )
}

const navbarQuery = graphql`
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
  allMdx(
    sort: { order: DESC, fields: [frontmatter___date] },
    filter: { fields: { sourceName: { eq: "stacks" } } }) {
    edges {
      node {
        ...MdxFields
      }
    }
  }
}`;

export default Navbar;