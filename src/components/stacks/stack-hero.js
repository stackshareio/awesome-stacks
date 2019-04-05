import React from "react";

function StackHero({ title, description, contributors, updatedAt }) {
  return (
    <div className="hero has-background-blue-gradient has-text-white stack-hero">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-10">
              <h1 className="is-size-1 has-margin-bottom-20">{title}</h1>
              <p className="is-size-4">{description}</p>
            </div>
            {contributors ?
              <div className="column is-2 has-text-right" style={{ marginTop: `auto` }}>
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