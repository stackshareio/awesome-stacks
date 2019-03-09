import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>There's no Awesome Stack here yet. <Link to="/">Create one?</Link></p>
  </Layout>
)

export default NotFoundPage
