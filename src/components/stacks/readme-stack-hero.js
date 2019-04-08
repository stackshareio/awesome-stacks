import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ReadmeStackHero({ stack: { name, description, index }, stacks }) {
  var nextStack = stacks[index + 1];
  const prevStack = stacks[index - 1];
  return (
    <div className="hero has-background-blue-gradient has-text-white stack-hero">
      <div className="hero-body is-relative">
        <div className="container">
          <div className="columns">
            <div className="column is-relative">
              {prevStack ?
                <div className="arrow prev-arrow">
                  <Link to={`/${prevStack.path}`} title="Previous stack">
                    <FontAwesomeIcon icon="arrow-circle-left" size="2x" color="#8E9FA9" />
                  </Link>
                </div>
                : ""
              }
              <h1 className="is-size-2 has-margin-bottom-20">{name}</h1>
              <p className="is-size-5">{description}</p>
              {nextStack ?
                <div className="arrow next-arrow">
                  <Link to={`/${nextStack.path}`} title="Next stack">
                    <FontAwesomeIcon icon="arrow-circle-right" size="2x" color="#8E9FA9" />
                  </Link>
                </div>
                : ""
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReadmeStackHero