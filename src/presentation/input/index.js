import React from "react";
import './input.scss';

const Input = ({ data, handleOnChange, placeHolder, value, icon }) => {

  const onChange = (e) => {
    handleOnChange(e.target.value);
  };

  return (
    <div className="c-input">
      {data && data.label && <label htmlFor="input">{data.label}</label>}
      {icon && <img src={icon} alt="input-icon" />}
      <input
        id="input"
        name="input"
        type="text"
        value={value}
        onChange={onChange}
        placeHolder={placeHolder}
      />
    </div>
  );
};

export default Input;
