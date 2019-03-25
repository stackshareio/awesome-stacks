import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import StackShareCard from "./stackshare"

function StackShare({ name, children }) {
  const data = useStaticQuery(query);
  const stackshare = getNode(name, data);
  return (
    <StackShareCard name={name} stackshare={stackshare}>
      {children}
    </StackShareCard>
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
function getNode(name, data) {
  var tool;
  data.allMdx.edges.forEach((edge) => {
    const tools = edge.node.fields.stackShareTools;
    tools.forEach((_tool) => {
      if (_tool.name === name) {
        tool = _tool;
      }
    });
  });
  return tool;
}

export default StackShare
