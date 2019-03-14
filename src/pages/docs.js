import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Docs from "../snippets/docs"
import { MDXProvider } from '@mdx-js/tag';

const header = props => <div className="anchor"><a name={`${props.children.replace(/[\ -]/g, ``).toLowerCase()}`}></a><h2 className="" {...props} /></div>
const components = {
  h2: header
}

const ContributingPage = () => (
  <Layout>
    <SEO title="Documentation" />
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-9">
            <div className="content">
              <MDXProvider components={components}>
              <Docs />
              </MDXProvider>
            </div>
          </div>
          <div className="column is-3">
            <div className="box grey-box is-fixed has-width-200">
              <h3 className="is-size-5 is-uppercase">Contents</h3>
              <ul>
                <li><a href="#overview">&rsaquo; Overview</a></li>
                <li><a href="#setup">&rsaquo; Setup</a></li>
                <li><a href="#createastack">&rsaquo; Create a stack</a></li>
                <li><a href="#addtools">&rsaquo; Add tools</a></li>
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
