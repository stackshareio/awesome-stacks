import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StackCard = ({ node }) => (
  <>
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
        <div className="level is-mobile has-margin-top-20">
          {node.fields.stackShareTools.slice(0, 3).map((tool) =>
            <div className="level-item has-text-centered" key={tool.name}>
              <img alt={tool.name} src={tool.logo} className="is-logo"></img>
              {/* <div className="has-margin-top-10"></div> */}
              {/* {tool.fullName} */}
            </div>
          )}
          {node.fields.gitHubTools.slice(0, 3).map((tool) =>
            <div className="level-item has-text-centered" key={tool.name}>
              <div>
                <FontAwesomeIcon icon={["fab", "github"]} size="4x" color="#8E9FA9" />
                {/* <div className="has-margin-top-10"></div> */}
                {/* {tool.repoName} */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="columns">
      <div className="column has-text-right">
        <a className="button is-danger is-uppercase has-text-white" href={`/${node.parent.name}`}>> See this stack</a>
      </div>
    </div>
  </>
);

export default StackCard