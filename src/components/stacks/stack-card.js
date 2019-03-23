import React from "react"
import { Link } from "gatsby"

const StackCard = ({ node }) => (
  <>
    <div className="columns">
      <div className="column is-7">
        <h3 className="is-size-4 has-color-danger has-margin-top-5">
          <Link to={`/${node.parent.name}`}>
            {node.frontmatter.title}
          </Link>
        </h3>
        <p className="is-size-5 has-margin-top-10">
          {node.frontmatter.description}
        </p>
        <p className="has-margin-top-10">
          by {node.fields.contributors.map(contributor => <a href={contributor.url} key={contributor.login}>@{contributor.login}</a>).map((item, index) => [index > 0 && ' ', item])}
        </p>
      </div>
      <div className="column is-4 is-offset-1">
        <div className="level is-mobile has-margin-top-20">
          {node.fields.stackShareTools.slice(0, 3).map((tool) =>
            <div className="level-item has-text-centered justify-left" key={tool.name}>
              <img alt={tool.name} src={tool.logo} className="is-logo"></img>
            </div>
          )}
          {/* {node.fields.gitHubTools.slice(0, 3).map((tool) =>
            <div className="level-item has-text-centered justify-left" key={tool.name}>
              <div>
                <FontAwesomeIcon icon={["fab", "github"]} size="4x" color="#8E9FA9" />
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
    <div className="columns">
      <div className="column has-text-right">
        <Link className="button is-danger is-uppercase has-text-white" to={`/${node.parent.name}`}>> Read about this stack</Link>
      </div>
    </div>
  </>
);

export default StackCard