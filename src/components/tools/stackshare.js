import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function getMetric(name, metrics) {
  return metrics.find((metric) => {
    return metric.name === name;
  });
}

function getNode(name, data) {
  const tools = data.mdx.fields.stackShareTools;
  return tools.find((tool) => {
    return tool.name === name;
  });
}

function metricsLevelItem(icon, url, value) {
  return (
    <div>
      <a className="has-text-grey" href={url}>
        <FontAwesomeIcon icon={icon} fixedWidth /> <span>{value}</span>
      </a>
    </div>
  );
}

function StackShare({ name, data, children }) {
  const stackshare = getNode(name, data);
  if (!stackshare) {
    return (
      <div className="card is-tool-card">
        <div className="card-content has-text-centered has-text-danger">
          {name} not found
        </div>
      </div>);
  }
  const stacksMetric = getMetric(`Stacks`, stackshare.stackShareStats);
  const starsMetric = getMetric(`GitHubStars`, stackshare.gitHubStats);
  const forksMetric = getMetric(`GitHubForks`, stackshare.gitHubStats);
  return (
    <>
      <div className="card is-tool-card">
        <div className="card-content has-text-centered">
          <a href={stackshare.website}>
            <img alt="Tool logo" className="is-logo" src={stackshare.logo}></img>
          </a>
          <div className="is-size-5 has-margin-top-5">
            <a href={stackshare.website}>
              {stackshare.fullName}
            </a>
          </div>
          <div className="is-size-7 has-margin-top-5">
            {stackshare.tagline}
          </div>
          <div className="level is-mobile has-margin-top-20 has-margin-bottom-20">
            <div className="level-item has-text-left">
              <div>
                {stacksMetric ? metricsLevelItem(`bars`, `https://stackshare.io/${stackshare.name}`, stacksMetric.value) : ``}
                {starsMetric ? metricsLevelItem(`star`, `${stackshare.gitHubURL}/stargazers`, starsMetric.value) : ``}
                {forksMetric ? metricsLevelItem(`code-branch`, `${stackshare.gitHubURL}/network/members`, forksMetric.value) : ``}
              </div>
            </div>
            </div>
          <div className="level is-mobile has-margin-top-20 has-margin-bottom-20">
            <div className="level-item has-text-centered">
              <div>
                <div>
                  <a className="tag" href={stackshare.group.url}>{stackshare.group.name}</a>
                </div>
                <div>
                  <a className="tag" href={stackshare.category.url}>{stackshare.category.name}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children ?
        <div className="margin-top-5 has-padding-5 user-description">
          <FontAwesomeIcon icon="comment-alt" color="#8E9FA9" fixedWidth flip="horizontal" /> <i>{children}</i>
        </div> : <div />
      }
    </>
  );
}

export default StackShare
