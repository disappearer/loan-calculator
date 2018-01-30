import React from 'react';
import ReactDOM from 'react-dom';
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import App, { API_URL } from './App';
import Input from './components/Input';

enzyme.configure({ adapter: new Adapter() });

const constraintsResponse = {
  amountInterval: { min: 10, max: 2000, step: 10, defaultValue: 400 },
  termInterval: { min: 3, max: 30, step: 1, defaultValue: 15 }
};
const amount = constraintsResponse.amountInterval.defaultValue;
const term = constraintsResponse.termInterval.defaultValue;

const getConstraints = () => Promise.resolve(constraintsResponse);

const offerResponse = {
  totalPrincipal: '400',
  term: '15',
  totalCostOfCredit: 40,
  totalRepayableAmount: 480,
  monthlyPayment: 32
};

const getOffer = () => Promise.resolve(offerResponse);

console.log(API_URL);
describe('App component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <App getConstraints={getConstraints} getOffer={getOffer} />
    );
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('should contain 2 Input components', done => {
    getConstraints().then(() => {
      wrapper.update();
      expect(wrapper.find(Input).length).toEqual(2);
      done();
    });
  });
});
