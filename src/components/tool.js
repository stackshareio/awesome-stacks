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
          <a href={githubRepo.url}>
            <FontAwesomeIcon icon={["fab", "github"]} size="5x" color="#7a7a7a" />
          </a>
          <div className="is-size-5 has-margin-top-5">
            <a href={githubRepo.url}>
              {githubRepo.name}
            </a>
          </div>
          <div className="level is-mobile has-margin-top-10 has-margin-bottom-20">
            <div className="level-item">
              <a href={`${githubRepo.url}/stargazers`}>
                <FontAwesomeIcon icon="star" fixedWidth /> <span>{githubRepo.stargazers.totalCount}</span>
              </a>
            </div>
            <div className="level-item">
              <a href={`${githubRepo.url}/network/members`}>
                <FontAwesomeIcon icon="code-branch" fixedWidth /> <span>{githubRepo.forks.totalCount}</span>
              </a>
            </div>
          </div>
          {/* <div className="tags justify-center">
            <a className="tag" href="">foo</a>
          </div> */}
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
