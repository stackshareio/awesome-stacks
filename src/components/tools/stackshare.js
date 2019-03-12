import _ from "lodash"
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function getMetric(name, metrics) {
  return _.find(metrics, (metric) => {
    return metric.name === name;
  });
}

function getNode(name, data) {
  const tools = data.mdx.fields.stackShareTools;
  return _.find(tools, (tool) => {
    return tool.name === name;
  });
}

function metricsLevelItem(icon, url, value) {
  return (
    <div className="level-item">
      <a href={url}>
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
              {stackshare.name}
            </a>
          </div>
          <div className="level is-mobile has-margin-top-10 has-margin-bottom-20">
            {stacksMetric ? metricsLevelItem(`bars`, `https://stackshare.io/`, stacksMetric.value) : ``}
            {starsMetric ? metricsLevelItem(`star`, `${stackshare.githubURL}/stargazers`, starsMetric.value) : ``}
            {forksMetric ? metricsLevelItem(`code-branch`, `${stackshare.githubURL}/network/members`, forksMetric.value) : ``}
          </div>
        </div>
      </div>
      {children ?
        <div className="margin-top-5 has-padding-5 user-description">
          <FontAwesomeIcon icon="comment-alt" color="#ccc" fixedWidth flip="horizontal" /> <i>{children}</i>
        </div> : <div />
      }
    </>
  );
}

export default StackShare
