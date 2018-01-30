import React from 'react';
import * as _ from 'lodash';

const Input = props => (
  <div>
    <div>{props.label}</div>
    <input
      type="range"
      min={props.min}
      max={props.max}
      step={props.step}
      value={props.value}
      onChange={props.onChange}
    />
    <select value={props.value} onChange={props.onChange}>
      {_.range(props.min, +props.max + 1, props.step).map(value => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  </div>
);

export default Input;
