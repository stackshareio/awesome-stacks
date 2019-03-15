import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from "./card"

function StackShare({ name, data, children }) {
  const stackshare = getNode(name, data);
  if (!stackshare) {
    return <Card color="danger">{name} not found</Card>
  }
  const stacksMetric = getMetric(`Stacks`, stackshare.stackShareStats);
  const starsMetric = getMetric(`GitHubStars`, stackshare.gitHubStats);
  const forksMetric = getMetric(`GitHubForks`, stackshare.gitHubStats);
  return (
    <Card description={children}>
      <div className="is-top">
        <a href={stackshare.url}>
          <img alt="Tool logo" className="is-logo" src={stackshare.logo}></img>
        </a>
        <div className="is-size-5 has-margin-top-5">
          <a href={stackshare.url}>
            {stackshare.fullName}
          </a>
        </div>
      </div>
      <div className="is-size-7 has-margin-top-5 is-middle">
        {stackshare.tagline}
      </div>
      <div className="is-bottom">
        <div className="level is-mobile has-margin-bottom-20 has-overflow-hidden">
          <div className="level-item has-text-left">
            <div>
              {stacksMetric ? metricsLevelItem(`bars`, `https://stackshare.io/${stackshare.name}/in-stacks`, stacksMetric.value) : ``}
              {starsMetric ? metricsLevelItem(`star`, `${stackshare.gitHubURL}/stargazers`, starsMetric.value) : ``}
              {forksMetric ? metricsLevelItem(`code-branch`, `${stackshare.gitHubURL}/network/members`, forksMetric.value) : ``}
            </div>
          </div>
          <div className="level-item has-text-right">
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
    </Card>
  );
}

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

export default StackShare
