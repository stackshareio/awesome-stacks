import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

function Navbar() {
  const data = useStaticQuery(navbarQuery);
  const Tags = data.allMdx.edges.map(edge => <a class="tag is-medium" key={edge.node.id} href={`/${edge.node.parent.name}`}>{edge.node.frontmatter.title}</a>);
  const [dropdown, setDropdown] = useState(0);
  return (
    <div class="nav navbar is-fixed-top has-shadow has-background-white">
      <div class="container">
        <div class="navbar-brand">
          <Link class="navbar-item" to="/">
            <Img fixed={data.brandImage.childImageSharp.fixed} />
            <div class="is-size-4 has-margin-left-10">
              {data.site.siteMetadata.title}
            </div>
          </Link>
          <div class="span navbar-burger burger" data-target="navbarMenuHeroA">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div class="navbar-menu" id="#navbarMenuHeroA">
          <div class="navbar-end">
            <div class={`navbar-item has-dropdown ${dropdown}`}
              onClick={() => setDropdown(dropdown === 'is-active' ? '' : 'is-active')}>
              <div class="navbar-link"><span role="img" aria-label="fire">🔥</span> &nbsp; Stacks</div>
              <div class="navbar-dropdown" style={{ width: "300px" }}>
                <div class="navbar-item">
                  <div class="tags">
                    {Tags}
                  </div>
                </div>
              </div>
            </div>
            <div class="navbar-item">
              <a class="button is-rounded is-danger" href="/contributing">Contribute</a>
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