import React from "react";
import "./Dropdown.css"; // Import your CSS file for styling

const Dropdown = ({
  label,
  options,
  value,
  onChange,
  className,
  name,
  errors,
}) => {
  return (
    <div>
      <div className="dropdown-container">
        <label className="dropdown-label">{label}</label>

        <select
          name={name}
          className={`dropdown-select ${errors? 'error-outline':''}`}
          value={value}
          onChange={onChange}
        >
          <option className="placeholder" value="" disabled selected hidden>
            Enter value...
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {errors && <div className="error">{errors}</div>}
    </div>
  );
};

export default Dropdown;
