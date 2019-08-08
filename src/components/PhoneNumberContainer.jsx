import React from 'react';

export default (props) => {
  const { phones } = props;
  return (
    <div className="numbers-container">
      {phones.map((number, index) => (
        <div className="number-container" key={number}>
          <span>
            {index + 1 }
            .
            {' '}
          </span>
          <span>{number}</span>
        </div>
      ))}
    </div>
  );
};
