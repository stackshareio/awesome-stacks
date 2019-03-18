import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Contributors = ({ contributors }) => {
  return (
    <div className="section">
      <div className="container">
        <div className="columns is-mobile is-multiline">
          {contributors.map((contributor) => (
            <div key={contributor.login} className="column is-4-mobile is-2-tablet has-text-centered has-overflow-hidden">
              <a href={contributor.url}>
                <img className="is-avatar-image" src={contributor.avatarUrl} />
                <div className="is-size-7">@{contributor.login}</div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Contributors