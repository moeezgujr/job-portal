import React from 'react';
import './TextArea.css'; // Import your CSS file for styling

const TextArea = ({ label, value, onChange, className,name }) => {
  return (
    <div className="textarea-container">
      <label className="textarea-label">{label}</label>
      <textarea
        className={"textarea-input "+ className}
        value={value}
        name={name}
        onChange={onChange}
        placeholder="Write a description..."
      />
    </div>
  );
};

export default TextArea;
