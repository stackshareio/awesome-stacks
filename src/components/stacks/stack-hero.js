import React from "react";

function StackHero({ title, description, contributors, updatedAt }) {
  return (
    <div className="hero has-background-info has-text-white stack-hero">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-8">
              <h1 className="is-size-3">{title}</h1>
              <p className="is-size-5">{description}</p>
            </div>
            {contributors ?
              <div className="column is-4 has-text-right" style={{ marginTop: `auto` }}>
                <div style={{ alignSelf: "flex-start" }}>
                  {contributors.slice(0, 4).map((contributor) => (
                    <a key={contributor.login} href={contributor.url} style={{ display: "inline-block", margin: "2px" }}>
                      <img alt={`${contributor.login}`} style={{ width: "36px", height: "36px", borderRadius: "10px" }} src={contributor.avatarUrl} />
                    </a>
                  ))}
                </div>
                <ul>
                  <li>
                    Contributed by {contributors.map(contributor => <a key={contributor.login} href={contributor.url} className="is-strong">@{contributor.login}</a>).map((item, index) => [index > 0 && ' ', item])}
                  </li>
                  <li>
                    Last updated: {updatedAt}
                  </li>
                </ul>
              </div>
              : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StackHero