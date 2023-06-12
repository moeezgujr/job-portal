import React from 'react';
import './InputField.css'; // Import your CSS file for styling

const InputField = ({ label, value, onChange, className, type,placeholder,name}) => {
  return (
    <div className="input-container ">
      <label className="input-label">{label}</label>
      <input
        className={"input-field "+ className}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
