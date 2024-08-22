import React from 'react'

const UseForm = (props) => {

    const { index, formData, inputData, handleChange, handleBack } = props;
    return (
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
    )
}

export default UseForm