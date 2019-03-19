import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from "../card"
import { truncate } from "../../utils"

function StackShare({ name, children }) {
  const data = useStaticQuery(query);
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
        <div className="is-logo-link has-text-centered">
          <a href={stackshare.url}>
            <img alt="Tool logo" className="is-logo" src={stackshare.logo}></img>
          </a>
        </div>
        <div className="is-size-5 has-margin-top-5 has-text-centered">
          <a href={stackshare.url}>
            {stackshare.fullName}
          </a>
        </div>
      </div>
      <div className="is-size-7 has-margin-top-5 is-middle has-text-centered">
        {stackshare.tagline}
      </div>
      <div className="is-bottom">
        <div className="level is-mobile has-overflow-hidden">
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

const query = graphql`
query {
  allMdx(
    filter: { fields: { sourceName: { eq: "stacks" } } }
    ) {
    edges {
      node {
        ...MdxFields
      }
    }
  }
}
`
function getNode(name, data) {
  var tool;
  data.allMdx.edges.forEach((edge) => {
    const tools = edge.node.fields.stackShareTools;
    tools.forEach((_tool) => {
      if (_tool.name === name) {
        tool = _tool;
      }
    });
  });
  return tool;
}

export default StackShare
