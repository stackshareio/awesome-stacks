import React from "react"
import { Link } from "gatsby"
import GitHubIcon from "./github-icon"

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
          {stack.description}
        </p>
      </div>
      <div className="column is-offset-1 is-5">
        <div className="level is-mobile has-margin-top-20">
          {stack.tools.slice(0, 3).map((tool) =>
            <div className="level-item" key={tool.name}>
              {tool.stackShareData ?
                <img alt={tool.stackShareData.name} src={tool.stackShareData.imageUrl} style={{ width: "75px", borderRadius: "3px" }}></img>
                : tool.gitHubData ? <GitHubIcon github={tool.gitHubData} /> :
                  <div className="is-size-7" style={{ border: "1px dotted #8E9FA9", width: "60px", height: "60px", padding: "2px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    {tool.name}
                  </div>
              }
            </div>
          )}
        </div>
      </div>
    </div>
    {/* <div className="has-margin-bottom-20"></div>
    <div className="columns">
      <div className="column is-6 is-offset-6">
        <Link className="button is-danger is-uppercase has-text-white" to={`/${stack.path}`}>> Read about this stack</Link>
      </div>
    </div> */}
  </>
);

export default StackCard