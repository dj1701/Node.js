import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import Calculator from './index';

describe('<Calculator />', () => {

  it('should start with blank data state', () => {
    const unitUnderTest = shallow(<Calculator />);

    expect(unitUnderTest.state('valuesToCalculate')).to.equal('');
  });

  it('should call onClick Event to get sum from 1002,1 resulting in 1003', () => {
    const unitUnderTest = shallow(<Calculator />);
    const dataInput = unitUnderTest.find("input[id='datainput']");
    unitUnderTest.setState({valuesToCalculate: '1002,1'});

    unitUnderTest.find("button[id='add']").simulate('click');

    expect(unitUnderTest.state('sum')).to.equal(1003);
  })

  it('should call onClick Event to get sum from 100,2 resulting in 102', () => {
    const unitUnderTest = shallow(<Calculator />);
    const dataInput = unitUnderTest.find("input[id='datainput']");
    unitUnderTest.setState({valuesToCalculate: '100,2'});

    unitUnderTest.find("button[id='add']").simulate('click');

    expect(unitUnderTest.state('sum')).to.equal(102);
  })

  it('should call onChange Event to set valuesToCalculate state', () => {
    const unitUnderTest = shallow(<Calculator />);
    const input = unitUnderTest.find("input[id='datainput']");

    input.simulate('change', {target: { value: '1001' }});
    expect(unitUnderTest.state('valuesToCalculate')).to.equal('1001');
  });

  it('should calculate sum result from the DataInput value', () => {
    const unitUnderTest = shallow(<Calculator />);
    const dataInput = unitUnderTest.find("input[id='datainput']");
    unitUnderTest.setState({valuesToCalculate: '1,101'});

    unitUnderTest.find("button[id='add']").simulate('click');

    expect(unitUnderTest.state('sum')).to.equal(102);
  })

  it('should reset set from call to reset method', () => {
    const unitUnderTest = shallow(<Calculator />);
    unitUnderTest.setState({valuesToCalculate: '1101'});
    unitUnderTest.setState({sum: 10001});
    unitUnderTest.find("button[id='reset']").simulate('click');;

    expect(unitUnderTest.state('sum')).to.equal(0);
    expect(unitUnderTest.state('valuesToCalculate')).to.equal('');
  });

});
