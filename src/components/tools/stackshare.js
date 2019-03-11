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

function StackShare({ name, data, children }) {
  const stackshare = getNode(name, data);
  if (!stackshare) {
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
          <a href={stackshare.url}>
            <FontAwesomeIcon icon={["fab", "github"]} size="5x" color="#7a7a7a" />
          </a>
          <div className="is-size-5 has-margin-top-5">
            <a href={stackshare.url}>
              {stackshare.name}
            </a>
          </div>
          <div className="level is-mobile has-margin-top-10 has-margin-bottom-20">
            {/* <div className="level-item">
              <a href={`${stackshare.url}/stargazers`}>
                <FontAwesomeIcon icon="star" fixedWidth /> <span>{github.stargazers.totalCount}</span>
              </a>
            </div>
            <div className="level-item">
              <a href={`${stackshare.url}/network/members`}>
                <FontAwesomeIcon icon="code-branch" fixedWidth /> <span>{github.forks.totalCount}</span>
              </a>
            </div> */}
          </div>
        </div>
      </div>
      {children ?
        <div className="margin-top-5 has-padding-5 user-description">
          <FontAwesomeIcon icon="comment-alt" color="#ccc" fixedWidth flip="horizontal" /> <i>{children}</i>
        </div> : <div />
      }
    </>
  );
}

export default StackShare
