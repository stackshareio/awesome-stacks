import React from "react"
import { Link } from "gatsby"
import GitHubIcon from "./github-icon"
import { truncate } from "../../utils"

const StackCard = ({ stack }) => (
  <>
    <div className="columns">
      <div className="column is-6">
        <div className="anchor">
          <div id={stack.path}></div>
        </div>
        <h3 className="is-size-3 has-color-danger has-margin-top-5">
          <Link to={`/${stack.path}`}>
            {stack.name}
          </Link>
        </h3>
        <p className="has-margin-top-10">
          {truncate(stack.description, 150)}
        </p>
      </div>
      <div className="column is-offset-1 is-5">
        <div className="level is-mobile has-margin-top-20">
          {stack.tools.slice(0, 3).map((tool) =>
            <div className="level-item" key={tool.name}>
              <Link to={`/${stack.path}`}>
                {tool.stackShareData ?
                  <img alt={tool.stackShareData.name} src={tool.stackShareData.imageUrl} style={{ width: "75px", borderRadius: "3px" }}></img>
                  : tool.gitHubData ? <GitHubIcon github={tool.gitHubData} /> :
                    <div className="is-size-7" style={{ border: "1px dotted #8E9FA9", width: "60px", height: "60px", padding: "2px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                      {tool.name}
                    </div>
                }
              </Link>
            </div>
          )}
        </div>
        { stack.tools.length > 3 ?
          <div className="has-text-centered">
            <Link to={`/${stack.path}`} className="is-size-7">
              and {stack.tools.length - 3} more...
            </Link>
          </div>
        : "" }
      </div>
    </div>
  </>
);

export default StackCard