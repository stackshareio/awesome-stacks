import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "./card"
import { truncate } from "../../utils"

function GitHub({ name, children }) {
  const data = useStaticQuery(query);
  const github = getNode(name, data)
  if (!github) {
    return <Card color="danger">{name} not found</Card>
  }
  const languageEdge = github.languages.edges[0];
  const languageColor = languageEdge ? languageEdge.node.color : "#CC427F";
  const languageName = languageEdge ? languageEdge.node.name : '';
  const url = github.homepageUrl || github.url;
  return (
    <Card description={children}>
      <div className="is-top has-padding-top-5 has-text-centered">
        <a href={url} title={`Language: ${languageName}`} className="has-text-white" style={{ display: "inline-flex", justifyContent: "center", backgroundColor: languageColor, width: "75px", padding: "10px 0", borderRadius: "15px" }}>
          <span className="is-size-3 is-strong">{github.name.substring(0, 1).toUpperCase()}</span>
          <span className="is-size-3 is-strong">{github.name.substring(1, 2)}</span>
        </a>
        <div className="is-size-5 has-margin-top-10">
          <a href={url}>{github.name}</a>
        </div>
      </div>
      <div className="is-size-7 has-text-centered has-margin-bottom-10">
        <a className="has-text-grey" href={github.url}>
          <FontAwesomeIcon icon="external-link-alt" fixedWidth /> <span>GitHub</span>
        </a>
      </div>
      <div className="is-size-7 is-description has-text-centered" dangerouslySetInnerHTML={{ __html: github.descriptionHTML }} />
      <div className="level is-mobile is-bottom has-overflow-hidden has-margin-top-20">
        <div className="level-item has-text-left">
          <div>
            <a className="has-text-grey" href={`${github.url}/stargazers`}>
              <FontAwesomeIcon icon="star" fixedWidth />{" "}
              <span>{github.stargazers.totalCount}</span>
            </a>
            <div />
            <a className="has-text-grey" href={`${github.url}/network/members`}>
              <FontAwesomeIcon icon="code-branch" fixedWidth />{" "}
              <span>{github.forks.totalCount}</span>
            </a>
          </div>
        </div>
        {github.repositoryTopics.edges.length > 0 ? (
          <div className="level-item has-text-right">
            <div>
              {github.repositoryTopics.edges.map(edge => (
                <div key={edge.node.topic.name}>
                  <a className="tag is-grey" href={edge.node.url}>
                    #{truncate(edge.node.topic.name)}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : ''}
      </div>
    </Card>
  )
}

const query = graphql`
query {
  allMdx(
    filter: { fields: { sourceName: { eq: "content-stacks" } } }
    ) {
    edges {
      node {
        ...MdxFields
      }
    }
  }
}
`

function getNode(nameWithOwner, data) {
  var tool;
  data.allMdx.edges.forEach((edge) => {
    const tools = edge.node.fields.gitHubTools;
    tools.forEach((_tool) => {
      if (_tool.nameWithOwner === nameWithOwner) {
        tool = _tool;
      }
    });
  });
  return tool;
}

export default GitHub
