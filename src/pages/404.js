import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-10">
            <div className="message is-danger">
              <div className="message-body">
                <h1 className="is-size-3">404 AWESOMENESS NOT FOUND</h1>
                <p className="has-margin-top-30 has-margin-bottom-30">There's no Awesome Stack here yet. <Link to="/">Create one?</Link></p>
              </div>
              <div className="has-margin-bottom-60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
