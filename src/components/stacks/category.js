import React from "react"
import StackCard from "./stack-card"

const Category = ({ category }) => {
  const Stacks = category.stacks.map(stack => (
    <>
      <div className="has-margin-bottom-40" />
      <StackCard key={stack.name} stack={stack} />
      <div className="has-margin-bottom-40" />
    </>
  ))
  return (
    <>
      <h1 className="is-size-3 has-text-grey">
        {category.name}
      </h1>
      {Stacks}
      <div className="has-margin-bottom-100 has-dotted-line" />
    </>
  )
}

export default Category
