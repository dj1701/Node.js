import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import PrimeFactor from './index';
import '../../enzyme.config';

describe('<PrimeFactor /> ', () => {
  
    it('Should render PrimeFactor', () => {
      var unitUnderTest = mount(<PrimeFactor />);

      expect(unitUnderTest.find("input[id='given']").length).to.equal(1);
    });

    it('should call onClick Event to get prime factors from 10 resulting in 2,5', () => {
      var unitUnderTest = shallow(<PrimeFactor />);
      unitUnderTest.setState({valueToFactorize: '10'});

      unitUnderTest.find("button[id='find']").simulate('click');

      expect(unitUnderTest.state('primeFactors')).to.eql([2,5]);
    });

    it('should call onClick Event for reset to reinitialize state and fields', () => {
      var unitUnderTest = shallow(<PrimeFactor />);
      unitUnderTest.setState({valueToFactorize: '101'});

      unitUnderTest.find("button[id='reset']").simulate('click');

      expect(unitUnderTest.state('primeFactors')).to.eql('');
      expect(unitUnderTest.state('valueToFactorize')).to.eql(0);
    });

    it('should from input value of 1001 from control to set state and compute result of 7,11,13', () => {
      var unitUnderTest = shallow(<PrimeFactor />);
      unitUnderTest.setState({valueToFactorize: '1001'});

      unitUnderTest.find("button[id='find']").simulate('click');

      expect(unitUnderTest.state('primeFactors')).to.eql([7,11,13]);
    });

});
