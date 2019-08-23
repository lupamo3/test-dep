import React, { useEffect, useState } from 'react';
import Input from './Input';
import PhoneNumberContainer from './PhoneNumberContainer';

export default () => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [numbersCount, setNumbersCount] = useState(0);
  const [error, setError] = useState(false);

  const generatePhoneNumber = () => {
    if (numbersCount) {
      const tempPhones = [];
      for (let i = 0; i < numbersCount; i++) {
        tempPhones.push(`0${Math.floor(Math.random() * 900000000) + 100000000}`);
      }
      setPhoneNumbers(tempPhones);
      localStorage.setItem('phoneNumbers', JSON.stringify(tempPhones));
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (isNaN(value) || Number(value) > 10000) {
      setError(true);
    } else {
      setNumbersCount(value);
      setError(false);
    }
  };

  const handleClick = () => generatePhoneNumber();

  const handleSortChange = (e) => {
    const { value } = e.target;
    if (value === 'ascending') {
      return setPhoneNumbers([...phoneNumbers].sort());
    } if (value === 'descending') {
      return setPhoneNumbers([...phoneNumbers].reverse());
    }
  };

  useEffect(() => {
    const storedNumbers = JSON.parse(localStorage.getItem('phoneNumbers'));
    if (storedNumbers) {
      setPhoneNumbers(storedNumbers);
    }
  }, [setPhoneNumbers]);

  return (
    <div className="wrapper">
      <div className="container main">
        <h1 className="text-center">Random Number Generator</h1>
        <div className="row">
          <div className="col-sm">
            {error
              && (
              <div className="alert alert-danger" role="alert">
                Please enter a valid number or value less than 10000
              </div>
              )
            }
            <Input
              type="text"
              placeholder="Enter number of phone numbers"
              className="phone-input"
              value={numbersCount}
              onChange={handleInputChange}
            />
            <button type="button" className="btn btn-primary" onClick={handleClick}>Generate phone numbers</button>
          </div>
          <div className="col-sm ">
            <h6>Sort</h6>
            <Input
              type="radio"
              label="Ascending"
              name="sort-radio"
              value="ascending"
              onChange={handleSortChange}
            />
            <Input
              type="radio"
              label="Descending"
              name="sort-radio"
              value="descending"
              onChange={handleSortChange}
            />
          </div>
          {phoneNumbers.length
            ?
              <div className="col-sm">
                <p>
                  <span>Max:</span>
                  {` 0${Math.max(...phoneNumbers)}`}
                </p>
                <p>
                  <span>Min:</span>
                  {` 0${Math.min(...phoneNumbers)}`}
                </p>
                <p>
                  <span>Total:</span>
                  {` ${phoneNumbers.length}`}
                </p>
              </div>
            :
            null
          }
        </div>
      </div>
      <div className="container phones">
        <PhoneNumberContainer phones={phoneNumbers} />
      </div>
    </div>
  );
};
