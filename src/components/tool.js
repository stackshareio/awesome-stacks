import React from "react"

function Tool({ data }) {
  return (
    <div className="card is-tool-card">
      <div className="card-content has-text-centered">
        {data.github.repository.description}
      </div>
    </div>
  );
}

export default Tool
