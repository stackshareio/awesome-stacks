import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Contributing from "../snippets/contributing"

const ContributingPage = () => (
  <Layout>
    <SEO title="Documentation" />
    <div className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-8">
            <div className="content">
              <Contributing />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default ContributingPage
