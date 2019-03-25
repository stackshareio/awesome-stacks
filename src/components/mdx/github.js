import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import GitHubCard from "../stacks/github-card"

function GitHub({ name, children }) {
  const data = useStaticQuery(query);
  const github = getNode(name, data)
  return (
    <GitHubCard name={name} github={github}>
      {children}
    </GitHubCard>
  )
}

const query = graphql`
query {
  allMdx(
    filter: { fields: { sourceName: { eq: "content-stacks" } } }
    ) {
    edges {
      node {
        ...MdxFields
      }
    }
  }
}
`

function getNode(nameWithOwner, data) {
  var tool;
  data.allMdx.edges.forEach((edge) => {
    const tools = edge.node.fields.gitHubTools;
    tools.forEach((_tool) => {
      if (_tool.nameWithOwner === nameWithOwner) {
        tool = _tool;
      }
    });
  });
  return tool;
}

export default GitHub
