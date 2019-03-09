import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Contributing from "../snippets/contributing"

const ContributingPage = () => (
  <Layout>
    <SEO title="Contributing" />
    <div class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-10">
            <div class="content">
              <Contributing />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default ContributingPage
