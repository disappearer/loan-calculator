import React from 'react';
import ReactDOM from 'react-dom';
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import App, { API_URL } from './App';

enzyme.configure({ adapter: new Adapter() });

const constraintsResponse = {
  amountInterval: { min: 10, max: 2000, step: 10, defaultValue: 400 },
  termInterval: { min: 3, max: 30, step: 1, defaultValue: 15 }
};
const amount = constraintsResponse.amountInterval.defaultValue;
const term = constraintsResponse.termInterval.defaultValue;

describe('App component', () => {
  beforeEach(() => {
    console.log(API_URL);
    fetchMock.get(API_URL + '/constraints', {
      body: JSON.stringify(constraintsResponse),
      headers: { 'content-type': 'application/json' }
    });
    fetchMock.get(
      API_URL + `/first-loan-offer/?amount=${amount}&term=${term}`,
      {
        body: JSON.stringify(constraintsResponse),
        headers: { 'content-type': 'application/json' }
      }
    );
  });

  afterEach(() => {
    fetchMock.restore();
  });

  xit('should contain Input components', () => {
    wrapper = mount(<App />);
    expect(wrapper.find('Input').length).toBe(1);
  });
});
