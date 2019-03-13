import React from "react";
import { MDXTag } from '@mdx-js/tag';
import Layout from "./layout";
import SEO from "./seo";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from '@mdx-js/tag';

import Tools from "./tools"
import GitHub from "./tools/github"
import StackShare from "./tools/stackshare"

const MyH1 = props => <><hr /><h1 className="" {...props} /></>
const components = {
  h1: MyH1
}

function StackLayout({ data }) {
  const mdx = data.mdx;
  return (
    <Layout>
      <SEO title={mdx.frontmatter.title} />
      <div className="hero has-background-grey has-text-white stack-hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-8">
                <h1 className="is-size-2">{mdx.frontmatter.title}</h1>
                <p className="is-size-5">{mdx.frontmatter.description}</p>
              </div>
              <div className="column is-4 has-text-right">
                <p>Maintained by
                  {mdx.frontmatter.contributors.map(contributor => <a key={contributor.name} href={contributor.url} className="is-strong">&nbsp; @{contributor.name}</a>)}
                  <br></br>
                  Last updated: {mdx.frontmatter.date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column">
              <div className="content">
                <MDXProvider components={components}>
                  <MDXRenderer scope={{ React, MDXTag, Tools, GitHub, StackShare }} data={data}>
                    {mdx.code.body}
                  </MDXRenderer>
                </MDXProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="has-margin-bottom-60"></div>
    </Layout>
  );
}

// this will query our new node type which contains all the GitHub and StackShare references
export const pageQuery = graphql`
  query StackQuery($id: String, $query: String!) {
    github {
      search(query: $query, type: REPOSITORY, first: 100) {
        repositoryCount
        edges {
          node {
            ... on GitHub_Repository {
              name
              nameWithOwner
              description
              descriptionHTML
              stargazers {
                totalCount
              }
              repositoryTopics(first: 3) {
                edges {
                  node {
                    topic {
                      name
                    }
                  }
                }
              }
              forks {
                totalCount
              }
              updatedAt
              url
              homepageUrl
            }
          }
        }
      }
    }
    mdx(id: { eq: $id }) {
      id
      fields {
        stackShareTools {
          name
          fullName
          logo
          website
          category {
            name
            url
          }
          group {
            name
            url
          }
          stackShareStats {
            name
            value
          }
          gitHubStats {
            name
            value
            dateValue
          }
        }
      }
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