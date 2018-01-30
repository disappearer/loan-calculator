import React from 'react';
import ReactDOM from 'react-dom';
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { API_URL } from './App';
import Input from './components/Input';

enzyme.configure({ adapter: new Adapter() });

const constraintsResponse = {
  amountInterval: { min: 10, max: 2000, step: 10, defaultValue: 400 },
  termInterval: { min: 3, max: 30, step: 1, defaultValue: 15 }
};

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

  it('should contain 2 Input components', done => {
    getConstraints().then(() => {
      wrapper.update();
      expect(wrapper.find(Input).length).toEqual(2);
      done();
    });
  });

  it('should fetch constraints and set them in the state', done => {
    getConstraints().then(() => {
      wrapper.update();
      expect(wrapper.state('amountInterval')).toEqual(
        constraintsResponse.amountInterval
      );
      expect(wrapper.state('termInterval')).toEqual(
        constraintsResponse.termInterval
      );
      done();
    });
  });

  xit('should fetch offer when amount changed', done => {
    getConstraints().then(() => {
      wrapper.update;
    });
  });
});
