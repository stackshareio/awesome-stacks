import React from "react";
import { MDXTag, MDXProvider } from '@mdx-js/tag';
import Layout from "./layout";
import SEO from "./seo";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";

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
                <h1 className="is-size-3">{mdx.frontmatter.title}</h1>
                <p className="is-size-5">{mdx.frontmatter.description}</p>
              </div>
              <div className="column is-4 has-text-right" style={{ marginTop: `auto` }}>
                <ul>
                  <li>
                    Contributed by {mdx.frontmatter.contributors.map(contributor => <a key={contributor.name} href={contributor.url} className="is-strong">@{contributor.name}</a>).map((item, index) => [index > 0 && ' ', item])}
                  </li>
                  <li>
                    Last updated: {mdx.parent.modifiedTime}
                  </li>
                </ul>
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
              languages(first: 1) {
                edges {
                  node {
                    name
                    color                    
                  }
                }
              }
            }
          }
        }
      }
    }
    mdx(id: { eq: $id }) {
      ...MdxFields
    }
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { fields: { sourceName: { eq: "stacks" } } }
      ) {
      edges {
        node {
          ...MdxFields
        }
      }
    }
  }
`;
export default StackLayout