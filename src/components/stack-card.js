import React from "react"

const StackCard = ({ node }) => (
  <div class="card is-tool-card">
    <div class="card-content has-text-centered">
      <div class="is-size-4 has-margin-top-5">
        <a href={`/${node.parent.name}`}>
          {node.frontmatter.title}
        </a>
      </div>
      <p class="has-margin-top-10">
        {node.frontmatter.description}
      </p>
      <p class="has-margin-top-10">
        <span>by</span>
        {node.frontmatter.contributors.map(contributor => <a href={contributor.url} key={contributor.name}>&nbsp; @{contributor.name}</a>)}
      </p>
    </div>
  </div>
);

export default StackCard