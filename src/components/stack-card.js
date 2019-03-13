import React from "react"

const StackCard = ({ node }) => (
  <div className="columns">
    <div className="column is-6">
      <h3 className="is-size-4 has-color-danger has-margin-top-5">
        <a href={`/${node.parent.name}`}>
          {node.frontmatter.title}
        </a>
      </h3>
      <p className="is-size-5 has-margin-top-10">
        {node.frontmatter.description}
      </p>
      <p className="has-margin-top-10">
        <span>by</span>
        {node.frontmatter.contributors.map(contributor => <a href={contributor.url} key={contributor.name}>&nbsp; @{contributor.name}</a>)}
      </p>
    </div>
    <div className="column is-6">
      <div className="tags is-centered has-margin-top-20">
        {node.fields.stackShareTools.slice(0, 3).map((tool) =>
          <a className="tag is-link" key={tool.fullName} href={tool.website}>{tool.name}</a>
        )}
        {node.fields.gitHubTools.slice(0, 3).map((tool) =>
          <a className="tag" key={tool.name} href={tool.url}>{tool.name}</a>
        )}
      </div>
    </div>
  </div>
);

export default StackCard