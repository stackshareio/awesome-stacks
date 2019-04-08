import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "./card"
import GitHubIcon from "./github-icon";
import { truncate, shortenLargeNumber } from "../../utils"

function GitHubCard({ name, description, github }) {
  if (!github) {
    return <Card color="danger">{name} not found</Card>
  }
  const url = github.homepageUrl || github.url;
  return (
    <Card description={description}>
      <div className="is-top has-padding-top-5 has-text-centered">
        <a href={url}><GitHubIcon github={github} /></a>
        <div className="has-margin-top-10">
          <a href={url} className="has-text-info is-size-4 is-strong" style={{ whiteSpace: "nowrap", overflow: "hidden", display: "block" }}>{github.name}</a>
        </div>
      </div>
      <div className="is-size-7 has-text-centered has-margin-top-10 has-margin-bottom-10">
        <a className="has-text-grey" href={github.url}>
          <FontAwesomeIcon icon="external-link-alt" fixedWidth /> <span>GitHub</span>
        </a>
      </div>
      <div className="is-description has-text-centered">
        {truncate(github.description, 70)}
      </div>
      <div className="level is-mobile is-bottom has-overflow-hidden has-margin-top-10">
        <div className="level-item has-text-left">
          <div>
            <a className="has-text-grey" href={`${github.url}/stargazers`}>
              <FontAwesomeIcon icon="star" fixedWidth />{" "}
              <span>{shortenLargeNumber(github.stargazers.totalCount, 1)}</span>
            </a>
            <div />
            <a className="has-text-grey" href={`${github.url}/network/members`}>
              <FontAwesomeIcon icon="code-branch" fixedWidth />{" "}
              <span>{shortenLargeNumber(github.forks.totalCount, 1)}</span>
            </a>
          </div>
        </div>
        {github.repositoryTopics.edges.length > 0 ? (
          <div className="level-item has-text-right">
            <div>
              {github.repositoryTopics.edges.map(edge => (
                <div key={edge.node.topic.name}>
                  <a className="tag" href={edge.node.url}>
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

export default GitHubCard
