import React from "react"

class Category extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div class="columns is-multiline is-centered has-margin-bottom-30">
        {React.Children.map(this.props.children,
          (child => <div class="column is-4 is-3-desktop">{child}</div>))}
      </div>);
  }
}

export default Category
