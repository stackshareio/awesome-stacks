import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navbar() {
  const data = useStaticQuery(navbarQuery);
  const [burger, setBurger] = useState('');
  return (
    <div className="nav navbar is-fixed-top has-shadow has-background-white">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <Img fixed={data.brandImage.childImageSharp.fixed} />
            <div className="is-size-5 has-margin-left-10">
              {data.site.siteMetadata.title}
            </div>
          </Link>
          <div className={`span navbar-burger burger ${burger}`} data-target="navbarMenuHeroA" onClick={() => setBurger(burger === 'is-active' ? '' : 'is-active')}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={`navbar-menu ${burger}`} id="#navbarMenuHeroA">
          <div className="navbar-end">
            {/* <a className="navbar-item" href="/about">About</a> */}
            <a className="navbar-item" href="/docs">Docs</a>
            <a className="navbar-item" href={data.site.siteMetadata.repository}>
              <FontAwesomeIcon icon={["fab", "github"]} />
              <span>&nbsp;&nbsp;GitHub</span>
            </a>
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
      repository
    }
  }
}`;

export default Navbar;