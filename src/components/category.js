import React from "react"

class Category extends React.Component {
  componentDidMount() {
    const { name, tools } = this.props
  }

  render() {
    return <h2>{this.props.name}</h2>
  }
}

export default Category
