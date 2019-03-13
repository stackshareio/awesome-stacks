import _ from "lodash"
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function getNode(name, data) {
  const edges = data.github.search.edges;
  const edge = _.find(edges, (edge) => {
    return edge.node.nameWithOwner === name;
  });
  return edge ? edge.node : undefined;
}

function GitHub({ name, data, children }) {
  const github = getNode(name, data);
  if (!github) {
    return (
      <div className="card is-tool-card">
        <div className="card-content has-text-centered has-text-danger">
          {name} not found
        </div>
      </div>);
  }
  return (
    <>
      <div className="card is-tool-card">
        <div className="card-content has-text-centered">
          <a href={github.url}>
            <FontAwesomeIcon icon={["fab", "github"]} size="5x" color="#8E9FA9" />
          </a>
          <div className="is-size-5 has-margin-top-5">
            <a href={github.url}>
              {github.name}
            </a>
          </div>
          <div className="level is-mobile has-margin-top-20 has-margin-bottom-20">
            <div className="level-item">
              <a href={`${github.url}/stargazers`}>
                <FontAwesomeIcon icon="star" fixedWidth /> <span>{github.stargazers.totalCount}</span>
              </a>
            </div>
            <div className="level-item">
              <a href={`${github.url}/network/members`}>
                <FontAwesomeIcon icon="code-branch" fixedWidth /> <span>{github.forks.totalCount}</span>
              </a>
            </div>
          </div>
          <div className="tags is-centered">
            {github.repositoryTopics.edges.map((edge) =>
              <a className="tag" key={edge.node.topic.name} href="{edge.node.url}">{edge.node.topic.name}</a>
            )}
          </div>
        </div>
      </div>
      {children ?
        <div className="margin-top-5 has-padding-5 user-description">
          <FontAwesomeIcon icon="comment-alt" color="#8E9FA9" fixedWidth flip="horizontal" /> <i>{children}</i>
        </div> : <div />
      }
    </>
  );
}

export default GitHub
