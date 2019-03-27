import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from "./card"
import { truncate } from "../../utils"

function StackShare({ name, description, stackshare }) {
  if (!stackshare) {
    return <Card color="danger">{name} not found</Card>
  }
  const stacksMetric = getMetric(`Stacks`, stackshare.stackShareStats);
  const starsMetric = getMetric(`GitHubStars`, stackshare.gitHubStats);
  const forksMetric = getMetric(`GitHubForks`, stackshare.gitHubStats);
  return (
    <Card description={description}>
      <div className="is-top">
        <div className="is-logo-link has-text-centered">
          <a href={stackshare.website}>
            <img alt="Tool logo" className="is-logo" src={stackshare.logo}></img>
          </a>
        </div>
        <div className="is-size-5 has-margin-top-5 has-text-centered">
          <a href={stackshare.website}>
            {stackshare.fullName}
          </a>
        </div>
      </div>
      <div className="is-size-7 has-text-centered has-margin-bottom-10">
        <a className="has-text-grey" href={stackshare.url}>
          <FontAwesomeIcon icon="external-link-alt" fixedWidth /> <span>StackShare</span>
        </a>
        {stackshare.gitHubURL ?
          <span className="has-text-grey">&nbsp;&middot;&nbsp;
            <a className="has-text-grey" href={stackshare.gitHubURL}>
              <FontAwesomeIcon icon="external-link-alt" fixedWidth /> <span>GitHub</span>
            </a>
          </span>
          : ``}
      </div>
      <div className="is-size-7 is-description has-text-centered">
        {truncate(stackshare.tagline, 70)}
      </div>
      <div className="is-bottom has-margin-top-20">
        <div className="level is-mobile has-overflow-hidden">
          <div className="level-item has-text-left">
            <div>
              {stacksMetric ? metricsLevelItem(`bars`, `https://stackshare.io/${stackshare.name}`, stacksMetric.value) : ``}
              {starsMetric ? metricsLevelItem(`star`, `${stackshare.gitHubURL}/stargazers`, starsMetric.value) : ``}
              {forksMetric ? metricsLevelItem(`code-branch`, `${stackshare.gitHubURL}/network/members`, forksMetric.value) : ``}
            </div>
          </div>
          <div className="level-item has-text-right">
            <div>
              <div>
                <a className="tag is-grey" href={stackshare.group.url}>{truncate(stackshare.group.name)}</a>
              </div>
              <div>
                <a className="tag is-grey" href={stackshare.category.url}>{truncate(stackshare.category.name)}</a>
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
