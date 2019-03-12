import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Navbar from "./navbar"
import Footer from "./footer"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCommentAlt, faStar, faCodeBranch, faBars } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCommentAlt, faStar, faCodeBranch, faBars)

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      } `}
    render={data => (
      <>
        <Navbar></Navbar>
        <main>{children}</main>
        <Footer></Footer>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
