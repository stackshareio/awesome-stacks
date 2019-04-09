import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Card({ description, color, children }) {
  return (
    <>
      <div className="card is-tool-card">
        <div className={`card-content ${color ? `has-text-${color}` : ``}`}>
          {children}
        </div>
      </div>
      {description ? (
        <div className="has-margin-top-10 has-margin-left-20 is-comment" style={{ lineHeight: "1.2rem" }}>
          <FontAwesomeIcon
            icon="comment-alt"
            color="#8E9FA9"
            fixedWidth
            flip="horizontal"
            style={{ marginLeft: "-20px" }}
          />{" "}
          <span className="is-italic">{description.replace(/ - /g, "")}</span>
        </div>
      ) : (
          <div />
        )}
    </>
  )
}

export default Card
