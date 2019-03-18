import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Contributors = ({ contributors }) => {
  return  (
    <div className="section">
      <div className="container">
        <div className="columns is-multiline">
          {contributors.map((contributor) => (
            <div key={contributor.login} className="column is-2 has-text-centered">
              <a href={contributor.url}>
                <img className="is-avatar-image" src={contributor.avatarUrl} />
                <div>@{contributor.login}</div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
)};

export default Contributors