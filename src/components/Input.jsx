import React from 'react';

const Input = props => (
  <div>
    <label htmlFor={props}>
      <input
        type={props.type}
        className={props.className}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      />
      {props.label}
    </label>
  </div>
);

export default Input;
