import React from "react"
import StackCard from "./stack-card"

const Category = ({ category }) => {
  const Stacks = category.stacks.map(stack => (
    <div className="has-margin-top-50 has-margin-bottom-50" key={stack.name} >
      <StackCard stack={stack} />
    </div>
  ))
  return (
    <>
      <h1 className="is-size-2 has-text-grey has-text-centered">
        {category.name}
      </h1>
      {Stacks}
      <div className="has-margin-top-50 has-margin-bottom-50 has-dotted-line" />
    </>
  )
}

export default Category
