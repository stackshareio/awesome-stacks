import React from "react";
import Layout from "./layout";
import SEO from "./seo";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";

function StackLayout({ data: { mdx } }) {
  return (
    <Layout>
      <SEO title={mdx.frontmatter.title} />
      <div class="section">
        <div class="container">
          <div class="columns">
            <div class="column is-8 is-offset-1">
              <h1 class="is-size-1">{mdx.frontmatter.title}</h1>
              <p class="is-size-5">{mdx.frontmatter.description}</p>
            </div>
            <div class="column is-2 has-text-right">
              <p><span class="is-strong">Maintained by</span></p>
              <ul class="has-margin-bottom-15">
                {mdx.frontmatter.contributors.map(contributor => <li><a href={contributor.url} key={contributor.name}>&nbsp; @{contributor.name}</a></li>)}
              </ul>
              <p class="has-margin-bottom-5"><span class="is-strong">Last updated</span></p>
              <p class="has-margin-bottom-15">{mdx.frontmatter.date}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="section has-padding-top-5">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-10">
              <div class="content">
                <MDXRenderer mdxData={mdx}>{mdx.code.body}</MDXRenderer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export const pageQuery = graphql`
  query StackQuery($id: String) {
    githubData {
      data {
        repository {
          description
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