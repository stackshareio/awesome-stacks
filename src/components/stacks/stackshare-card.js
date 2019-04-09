import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from "./card"
import { truncate, shortenLargeNumber } from "../../utils"

function StackShare({ name, description, stackshare }) {
  if (!stackshare) {
    return <Card color="danger">{name} not found</Card>
  }
  const stacksMetric = getMetric(`stacks`, stackshare.stackshareStats);
  const starsMetric = getMetric(`stars`, stackshare.githubStats || []);
  const forksMetric = getMetric(`forks`, stackshare.githubStats || []);
  return (
    <Card description={description}>
      <div className="is-top">
        <div className="is-logo-link has-text-centered">
          <a href={stackshare.websiteUrl}>
            <img alt="Tool logo" className="is-logo" src={stackshare.imageUrl}></img>
          </a>
        </div>
        <div className="has-margin-top-10 has-text-centered">
          <a className="has-text-info is-size-4 is-strong" href={stackshare.websiteUrl} title={stackshare.name}>
            {stackshare.name}
          </a>
        </div>
      </div>
      <div className="is-size-7 has-text-centered has-margin-top-10 has-margin-bottom-10">
        <a className="has-text-grey" href={stackshare.profileUrl}>
          <FontAwesomeIcon icon="external-link-alt" fixedWidth /> <span>StackShare</span>
        </a>
        {stackshare.githubUrl ?
          <span className="has-text-grey">&nbsp;&middot;&nbsp;
            <a className="has-text-grey" href={stackshare.githubUrl}>
              <FontAwesomeIcon icon="external-link-alt" fixedWidth /> <span>GitHub</span>
            </a>
          </span>
          : ``}
      </div>
      <div className="is-description has-text-centered" title={stackshare.description}>
        {truncate(stackshare.description, 70)}
      </div>
      <div className="is-bottom has-margin-top-10">
        <div className="level is-mobile has-overflow-hidden">
          <div className="level-item has-text-left">
            <div>
              {starsMetric ? metricsLevelItem(`star`, `${stackshare.githubUrl}/stargazers`, starsMetric.value) : ``}
              {forksMetric ? metricsLevelItem(`code-branch`, `${stackshare.githubUrl}/network/members`, forksMetric.value) : ``}
              {stacksMetric ? metricsLevelItem(`layer-group`, `${stackshare.profileUrl}/in-stacks`, stacksMetric.value) : ``}
            </div>
          </div>
          <div className="level-item has-text-right">
            <div>
              <div>
                <a className="tag" href={stackshare.group.url}>{truncate(stackshare.group.name)}</a>
              </div>
              <div>
                <a className="tag" href={stackshare.category.url}>{truncate(stackshare.category.name)}</a>
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
        <FontAwesomeIcon icon={icon} fixedWidth /> <span>{shortenLargeNumber(value, 1)}</span>
      </a>
    </div>
  );
}

export default StackShare
