import React from "react";
import { graphql } from "gatsby";
import Layout from "../layout";
import SEO from "../seo";

import Tools from "../mdx/tools"
import GitHubCard from "../stacks/github-card"
import StackShareCard from "../stacks/stackshare-card"
import StackHero from "../stacks/stack-hero"

function ReadmeStacksPage({ data, pageContext: { stackName } }) {
  const stack = data.markdownRemark.fields.stacks.find(stack => stack.name === stackName)
  const heroProps = {
    title: stack.name,
    description: stack.description
  }
  const tools = stack.tools.map(tool => {
    if (tool.stackShareData) {
      return (
        <StackShareCard name={tool.name} stackshare={tool.stackShareData}>
          {tool.description}
        </StackShareCard>
      );
    }
    else if (tool.gitHubData) {
      return (
        <GitHubCard name={tool.name} github={tool.gitHubData}>
          {tool.description}
        </GitHubCard>
      );
    } else {
      return
    }
  });
  return (
    <Layout>
      <SEO title={stack.name} />
      <StackHero {...heroProps} />
      <div className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column">
              <div className="content">
                <Tools>{tools}</Tools>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          description
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
export default ReadmeStacksPage