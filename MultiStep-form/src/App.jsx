import React, { useState } from 'react'
import './App.css'
import data from './utils/data'

function App() {
  const [formData, setFormData] = useState(data)
  const [index, setIndex] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    dob: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (index === formData.length - 1) {
      console.log('Form submitted successfully')
      setFormSubmitted(true)
    } else {
      setIndex((prev) => prev + 1)
    }
  }
  const handleChange = (e) => {
    const { id, value } = e.target
    const copYinputdat = { ...inputData }
    copYinputdat[id] = value
    setInputData(copYinputdat)
  }
  const handleBack = (e) => {
    e.preventDefault()
    setIndex((prev) => prev - 1)
  }
  console.log(inputData)
  return (
    <div className="app">
      {!formSubmitted ? (
        <form className="container" onSubmit={handleSubmit}>
          {index > 0 && (
            <a className="anchor" onClick={handleBack}>
              Back
            </a>
          )}
          <label className="label">{formData[index].label}</label>
          <input
            required
            value={inputData[formData[index].id]}
            id={formData[index].id}
            className="input"
            type={formData[index].type}
            placeholder={formData[index].placeholder}
            onChange={handleChange}
          />
          <button className="btn">{formData[index].btn}</button>
        </form>
      ) : (
        <div>
          <h2>Name:{inputData.name}</h2>
          <h2>Email:{inputData.email}</h2>
          <h2>DOB:{inputData.date}</h2>
          <h2>Password:{inputData.password}</h2>
        </div>
      )}
    </div>
  )
}

export default App
