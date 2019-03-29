import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logoImage from "../images/awesome-stacks-logo.svg"

function Navbar() {
  const data = useStaticQuery(navbarQuery);
  const [burger, setBurger] = useState('');
  return (
    <div className="nav navbar is-fixed-top has-shadow has-background-white">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img alt={data.site.siteMetadata.title} src={logoImage} style={{ height: "32px" }}></img>
          </Link>
          <div className={`span navbar-burger burger ${burger}`} data-target="navbarMenuHeroA" onClick={() => setBurger(burger === 'is-active' ? '' : 'is-active')}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={`navbar-menu ${burger}`} id="#navbarMenuHeroA">
          <div className="navbar-end">
            <Link className="navbar-item is-size-5" activeClassName="is-active" to="/about/">About</Link>
            <Link className="navbar-item is-size-5" activeClassName="is-active" to="/docs/">Contribute</Link>
            <a className="navbar-item is-size-5" href={data.site.siteMetadata.repository}>
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
  brandImage: file(relativePath: { eq: "awesome-stacks-logo.svg" }) {
    childImageSharp {
      fixed(height: 32) {
        ...GatsbyImageSharpFixed_noBase64
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