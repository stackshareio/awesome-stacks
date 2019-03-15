import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "./card"

function GitHub({ name, data, children }) {
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
                  <a className="tag" href={edge.node.url}>
                    #{edge.node.topic.name}
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

function getNode(name, data) {
  const edges = data.github.search.edges
  const edge = edges.find(edge => {
    return edge.node.nameWithOwner === name
  })
  return edge ? edge.node : undefined
}

export default GitHub
