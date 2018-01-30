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

const fetchConstraints = sinon
  .stub()
  .returns(Promise.resolve(constraintsResponse));

const offerResponse = {
  totalPrincipal: '400',
  term: '15',
  totalCostOfCredit: 40,
  totalRepayableAmount: 480,
  monthlyPayment: 32
};

const fetchOffer = sinon.stub().returns(Promise.resolve(offerResponse));

describe('App component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <App fetchConstraints={fetchConstraints} fetchOffer={fetchOffer} />
    );
  });

  it('should contain 2 Input components', done => {
    Promise.all([fetchConstraints(), fetchOffer()]).then(() => {
      wrapper.update();
      expect(wrapper.find(Input).length).toEqual(2);
      done();
    });
  });

  it('should fetch constraints and set them in the state', done => {
    fetchConstraints().then(() => {
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

  it('should update amount in state on amount change', () => {
    wrapper.instance().onAmountChange({ target: { value: '1000' } });
    wrapper.update();
    expect(wrapper.state('amount')).toEqual('1000');
  });

  xit('should fetch offer when amount changed', done => {
    fetchConstraints().then(() => {
      wrapper.update();
      const input = wrapper.find('input').at(0);
      console.log(input.debug());
      input.simulate('change', { target: { value: '500' } });
      fetchOffer().then(() => {
        wrapper.update();
      });
      done();
    });
  });
});
