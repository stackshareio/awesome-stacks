import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import About from "../snippets/about"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-10">
            <div className="content">
              <About />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default AboutPage
