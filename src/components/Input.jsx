import React from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';

const Input = ({ label, min, max, step, value, onChange }) => (
  <div>
    <div>{label}</div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
    />
    <select value={value} onChange={onChange}>
      {_.range(min, +max + 1, step).map(value => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Input;
