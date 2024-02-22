import React, { useState } from "react"
import { navigate } from "gatsby"

const IndexPage = () => {
  const [selectedOption, setSelectedOption] = useState("")

  const handleChange = (event) => {
    const value = event.target.value
    setSelectedOption(value)
    navigate(`/?foo=${value}`)
  }

  return (
    <div>
      <h1>Select an Option:</h1>
      <select value={selectedOption} onChange={handleChange}>
        <option value="">Select</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
        <option value="C">Option C</option>
      </select>
    </div>
  )
}

export default IndexPage
