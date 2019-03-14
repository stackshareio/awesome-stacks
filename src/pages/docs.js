import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Contributing from "../snippets/contributing"

const ContributingPage = () => (
  <Layout>
    <SEO title="Documentation" />
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-9">
            <div className="content">
              <Contributing />
            </div>
          </div>
          <div className="column is-3">
            <div class="box grey-box">
              <h3 className="is-size-5 is-uppercase">Contents</h3>
              <ul>
                <li><a href="#overview">&rsaquo; Overview</a></li>
                <li><a href="#setup">&rsaquo; Setup</a></li>
                <li><a href="#create-stack">&rsaquo; Create a stack</a></li>
                <li><a href="#add-tools">&rsaquo; Add tools</a></li>
                <li><a href="#review">&rsaquo; Review</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default ContributingPage
