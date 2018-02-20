import React from 'react';
import enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import App, { API_URL } from './App';
import Input from './components/Input';

enzyme.configure({ adapter: new Adapter() });

const constraintsResponse = {
  amountInterval: { min: 10, max: 2000, step: 10, defaultValue: 400 },
  termInterval: { min: 3, max: 30, step: 1, defaultValue: 15 }
};

const offerResponse = {
  totalPrincipal: '400',
  term: '15',
  totalCostOfCredit: 40,
  totalRepayableAmount: 480,
  monthlyPayment: 32
};

const api = {
  fetchConstraints: sinon.stub().returns(Promise.resolve(constraintsResponse)),

  fetchOffer: sinon.stub().returns(Promise.resolve(offerResponse))
};

const props = {
  amountInterval: constraintsResponse.amountInterval,
  termInterval: constraintsResponse.termInterval,
  amount: constraintsResponse.amountInterval.defaultValue,
  term: constraintsResponse.termInterval.defaultValue,
  totalCostOfCredit: offerResponse.totalCostOfCredit,
  totalRepayableAmount: offerResponse.totalRepayableAmount,
  monthlyPayment: offerResponse.monthlyPayment,
  onAmountChange: () => {},
  onTermChange: () => {},
  isFetchingConstraints: false,
  isFetchingOffer: false
};

xdescribe('App component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App api={api} />);
  });

  it('should contain 2 Input components', done => {
    api.fetchConstraints().then(() => {
      wrapper.update();
      expect(wrapper.find(Input).length).toEqual(2);
      done();
    });
  });
});
