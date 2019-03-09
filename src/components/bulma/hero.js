import React from "react"

const Hero = ({ children }) => (
  <div className="hero">
    <div className="hero-head">
      {children}
    </div>
  </div>
)

export default Hero