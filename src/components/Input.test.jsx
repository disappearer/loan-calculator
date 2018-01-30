import React from 'react';
import ReactDOM from 'react-dom';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Input from './Input';

enzyme.configure({ adapter: new Adapter() });

describe('Input component', () => {
  let wrapper;
  const onChangeSpy = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Input min="1" max="5" step="1" onChange={onChangeSpy} />
    );
  });

  it('should contain an input of type range', () => {
    const input = wrapper.find('input');
    expect(input.length).toBe(1);
    expect(input.prop('type')).toEqual('range');
  });

  it('should contain a select', () => {
    expect(wrapper.find('select').length).toBe(1);
    expect(wrapper.find('option').length).toBe(5);
  });

  xit('should call props.onChange when change happens', () => {
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '3' } });
    expect(onChangeSpy.calls.length).toBe(1);
  });
});
