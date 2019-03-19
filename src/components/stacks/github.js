import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "../card"
import { truncate } from "../../utils"

function GitHub({ name, children }) {
  const data = useStaticQuery(query);
  const github = getNode(name, data)
  if (!github) {
    return <Card color="danger">{name} not found</Card>
  }
  return (
    <Card description={children}>
      <div className="is-top">
        <div className="is-logo-link has-text-centered is-relative">
          <a href={github.url}>
            <div style={{ zIndex: 2 }}>
              <div className="has-padding-top-10">
                <span className="is-size-2">{github.name.substring(0, 1).toUpperCase()}</span>
                <span className="is-size-2">{github.name.substring(1, 2)}</span>
              </div>
              <FontAwesomeIcon icon={["fab", "github"]} size="5x" color="#8E9FA9" style={{ position: "absolute", top: 0, left: 0, right: 0, marginLeft: "auto", marginRight: "auto", zIndex: 1, opacity: 0.10 }} />
            </div>
          </a>
        </div>
        <div className="is-size-5 has-margin-top-10">
          <a href={github.url}>{github.name}</a>
        </div>
      </div>
      <div className="is-size-7 has-margin-top-5 is-middle" dangerouslySetInnerHTML={{ __html: github.descriptionHTML }} />
      <div className="level is-mobile is-bottom has-overflow-hidden">
        <div className="level-item has-text-left">
          <div>
            <a className="has-text-grey" href={`${github.url}/stargazers`}>
              <FontAwesomeIcon icon="star" fixedWidth />{" "}
              <span>{github.stargazers.totalCount}</span>
            </a>
            <div />
            <a className="has-text-grey" href={`${github.url}/network/members`}>
              <FontAwesomeIcon icon="code-branch" fixedWidth />{" "}
              <span>{github.forks.totalCount}</span>
            </a>
          </div>
        </div>
        {github.repositoryTopics.edges.length > 0 ? (
          <div className="level-item has-text-right">
            <div>
              {github.repositoryTopics.edges.map(edge => (
                <div key={edge.node.topic.name}>
                  <a className="tag is-grey" href={edge.node.url}>
                    #{truncate(edge.node.topic.name)}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : ''}
      </div>
    </Card>
  )
}

const query = graphql`
query {
  allMdx(
    filter: { fields: { sourceName: { eq: "stacks" } } }
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
