import _ from "lodash"
import React from "react"

function getRepo(name, data) {
  const edges = data.github.search.edges;
  const edge = _.find(edges, (edge) => {
    return edge.node.nameWithOwner === name;
  });
  return edge ? edge.node : undefined;
}

function Tool({ name, data }) {
  console.log(data);
  const githubRepo = getRepo(name, data);
  if (!githubRepo) {
    return <div className="card is-tool-card">{name} not found</div>
  }
  return (
    <div className="card is-tool-card">
      <div className="card-content has-text-centered">
        {githubRepo.name}
      </div>
    </div>
  );
}

export default Tool
