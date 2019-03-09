import React from "react"

class Tool extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div class="card is-tool-card">
        <div class="card-content has-text-centered">
          {this.props.url}
        </div>
      </div>
    );
  }
}

export default Tool
