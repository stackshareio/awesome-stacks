import React from "react"

function GitHubIcon({ github }) {
  const languageEdge = github.languages.edges[0]
  const languageColor = languageEdge ? languageEdge.node.color : "#CC427F"
  const languageName = languageEdge ? languageEdge.node.name : ""
  return (
    <div
      title={`Language: ${languageName}`}
      className="has-text-white"
      style={{
        display: "inline-flex",
        justifyContent: "center",
        backgroundColor: languageColor,
        width: "75px",
        padding: "10px 0",
        borderRadius: "15px",
      }}
    >
      <span className="is-size-3 is-strong">
        {github.name.substring(0, 1).toUpperCase()}
      </span>
      <span className="is-size-3 is-strong">{github.name.substring(1, 2)}</span>
    </div>
  )
}

export default GitHubIcon
