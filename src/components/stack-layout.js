import React from "react";
import Layout from "./layout";
import SEO from "./seo";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";

function StackLayout({ data }) {
  const mdx = data.mdx;
  return (
    <Layout>
      <SEO title={mdx.frontmatter.title} />
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-8 is-offset-1">
              <h1 className="is-size-1">{mdx.frontmatter.title}</h1>
              <p className="is-size-5">{mdx.frontmatter.description}</p>
            </div>
            <div className="column is-2 has-text-right">
              <p><span className="is-strong">Maintained by</span></p>
              <ul className="has-margin-bottom-15">
                {mdx.frontmatter.contributors.map(contributor => <li key={contributor.name}><a href={contributor.url}>&nbsp; @{contributor.name}</a></li>)}
              </ul>
              <p className="has-margin-bottom-5"><span className="is-strong">Last updated</span></p>
              <p className="has-margin-bottom-15">{mdx.frontmatter.date}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="section has-padding-top-5">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-10">
              <div className="content">
                <MDXRenderer data={data}>{mdx.code.body}</MDXRenderer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export const pageQuery = graphql`
  query StackQuery($id: String, $owner: String!, $name: String!) {
    github {
      repository(owner: $owner, name: $name) {
        name
        description
        stargazers {
          totalCount
        }
      }
    }
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        contributors {
          name
          url
        }
        description
        date(formatString: "MMMM D, YYYY")
      }
      code {
        body
      }
    }
  }
`;
export default StackLayout