import React from "react"

function Tool({ key, name, data }) {
  return (
    <div className="card is-tool-card">
      <div className="card-content has-text-centered">
        {name}
      </div>
    </div>
  );
}

export default Tool
