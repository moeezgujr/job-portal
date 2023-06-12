import React, { useState } from "react";
import "./ToggleableInput.css";

const ToggleableInput = ({ text, disabled, name, value, onChange }) => {
  const [showDiv, setShowDiv] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleToggle = () => {
    setShowDiv(!showDiv);
  };

  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };

  return (
    <div className={"ToggleableInput"}>
      <div className="input-container">
        <button
          className={`${disabled == false ? "active-btn" : ""} toggle-button`}
          onClick={handleToggle}
        >
          {text}
        </button>
        <input
          type="text"
          disabled={disabled}
          className="time-input"
          name={name}
          value={value}
          onChange={onChange}
          placeholder="9:00 to 5:00"
        />
      </div>
    </div>
  );
};

export default ToggleableInput;
