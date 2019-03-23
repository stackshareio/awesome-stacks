import React from "react";
import { graphql } from "gatsby";

// import StackLayout from "layouts/stacks-layout";

function StackPage({ data, pageContext: { stackName } }) {
  const stack = data.markdownRemark.fields.stacks.find(stack => stack.name === stackName)
  return (
    <div>
      <div>{stack.name}</div>
    </div>
    // <StackLayout stack={stack}></StackLayout>
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
            }
          }
        }
      }
    }
    allMdx(
      sort: { order: DESC, fields: [frontmatter___createdAt] },
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
export default StackPage