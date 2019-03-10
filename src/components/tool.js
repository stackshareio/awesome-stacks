import _ from "lodash"
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function getRepo(name, data) {
  const edges = data.github.search.edges;
  const edge = _.find(edges, (edge) => {
    return edge.node.nameWithOwner === name;
  });
  return edge ? edge.node : undefined;
}

function Tool({ name, data, children }) {
  const githubRepo = getRepo(name, data);
  if (!githubRepo) {
    return <div className="card is-tool-card">{name} not found</div>
  }
  return (
    <>
      <div className="card is-tool-card">
        <div className="card-content has-text-centered">
          <a className="is-size-2 has-text-grey" href={githubRepo.url}>
            <FontAwesomeIcon icon={["fab", "github"]} size="2x" />
          </a>
          <a className="is-size-5 has-text-grey" href={githubRepo.url}>
            {githubRepo.name}
          </a>
        </div>
      </div>
      {children ? 
        <div className="margin-top-5 has-padding-5 user-description">
          <FontAwesomeIcon icon="comment-alt" color="#ccc" fixedWidth flip="horizontal" /> <i>{children}</i>
        </div> : <div/>
      }
    </>
  );
}

export default Tool
