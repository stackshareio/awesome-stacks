import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../layout";
import SEO from "../seo";

import Tools from "../mdx/tools"
import GitHubCard from "../stacks/github-card"
import StackShareCard from "../stacks/stackshare-card"
import StackHero from "../stacks/stack-hero"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ReadmeStacksPage({ data, pageContext: { stackName } }) {
  const stack = data.markdownRemark.fields.stacks.find(stack => stack.name === stackName);
  const heroProps = {
    title: stack.name,
    description: stack.description
  }
  const tools = stack.tools.map(tool => {
    if (tool.stackShareData) {
      return (
        <StackShareCard key={tool.name} name={tool.name} description={tool.description} stackshare={tool.stackShareData}>
          {tool.description}
        </StackShareCard>
      );
    }
    else if (tool.gitHubData) {
      return (
        <GitHubCard key={tool.name} name={tool.name} description={tool.description} github={tool.gitHubData}>
          {tool.description}
        </GitHubCard>
      );
    } else {
      return null;
    }
  });
  return (
    <Layout>
      <SEO title={stack.name} />
      <StackHero {...heroProps} />
      <div className="section has-margin-bottom-60">
        <div className="container">
          <div className="columns is-centered">
            <div className="column">
              <h2 className="is-size-2">Tools</h2>
              <Tools>{tools}</Tools>
            </div>
          </div>
          <div className="columns is-centered has-margin-bottom-60">
            <div className="column">
              <h2 className="is-size-2">Resources</h2>
              <div className="content">
                <ul className="has-margin-top-30 has-margin-bottom-30">
                  {stack.resources.length > 0 ? stack.resources.map(({ text, href }) => 
                    <li key={text}><div className="is-size-5"><a href={href}>{text}</a></div></li>
                  ) : <div>No guides or tutorials listed. <a href={data.site.siteMetadata.repository}>Edit this stack</a> to add some.</div>}
                </ul>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-6">
              <Link className="button is-medium is-danger has-text-white" to={`/#${stack.path}`}>&lt; Back to stacks</Link>
            </div>
            <div className="column is-6">
              <div className="has-text-right">
                <a className="button is-rounded is-grey" href={`${data.site.siteMetadata.repository}/blob/master/README.md#${stack.path}`}>
                  <FontAwesomeIcon icon={["fab", "github"]} />
                  <span>&nbsp;&nbsp;Edit this stack</span>
                </a>
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
          resources {
            text
            href
          }
          tools {
            name
            description
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
              description
              imageUrl
              websiteUrl
              profileUrl
              githubUrl
              group {
                name
                url
              }
              category {
                name
                url
              }
              stackshareStats {
                name
                value
              }
              githubStats {
                name
                value
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