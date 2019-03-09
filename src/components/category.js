import React from "react"

class Category extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="columns is-multiline is-centered has-margin-bottom-30">
        {React.Children.map(this.props.children,
          (child => <div className="column is-4 is-3-desktop">{child}</div>))}
      </div>);
  }
}

export default Category
