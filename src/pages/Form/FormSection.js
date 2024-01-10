import React from 'react';
import "./form.css"

const FormSection = ({
    label,
    placeholder,
    type,
    id,
    name,
    value,
    onChange,
    onBlur,
    errorMessage,
}) => {
    return (
            <div className="col-lg-5 col-md-5 col-sm-12 col-12 my-3">
                <div className="label">
                    <label htmlFor={id}>{label}</label>
                </div>
                <div className="input">
                    <input
                        className='i-f'
                        style={{ width: "100%" }}
                        placeholder={placeholder}
                        type={type}
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    {errorMessage && (
                        <div className="error-message" style={{ color: "red" }}>{errorMessage}</div>
                    )}
                </div>
            </div>
    );
};

export default FormSection;
