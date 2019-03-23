import React from "react";
import { graphql } from "gatsby";
import Layout from "../layout";
import SEO from "../seo";

function MarkdownStacksPage({ data, pageContext: { stackName } }) {
  const stack = data.markdownRemark.fields.stacks.find(stack => stack.name === stackName)
  return (
    <Layout>
      <SEO title={stack.name} />
      <div>{stack.name}</div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        repository
      }
    }
    markdownRemark(id: { eq: $id }) {
      fields {
        stacks {
          name
          path
          tools {
            gitHubData {
              name
              nameWithOwner
              description
              descriptionHTML
              stargazers {
                totalCount
              }
              repositoryTopics {
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
              languages {
                edges {
                  node {
                    name
                    color
                  }
                }
              }
            }
            stackShareData {
              name
              fullName
              tagline
              logo
              website
              url
              gitHubURL
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
        }
      }
    }
    allMdx(
      sort: { order: DESC, fields: [frontmatter___createdAt] },
      filter: { fields: { sourceName: { eq: "content-stacks" } } }
      ) {
      edges {
        node {
          ...MdxFields
        }
      }
    }
  }
`;
export default MarkdownStacksPage