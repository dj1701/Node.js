import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import DataInput from './index';

describe('<DataInput /> ', () => {

    it('Should render <DataInput />', () => {
      var unitUnderTest = mount(<DataInput />);

      expect(unitUnderTest.find('input[id="datainput"]').length).to.equal(1);
    });

    it('should start with zero', () => {
      var unitUnderTest = mount(<DataInput data={'0'}/>);

      expect(unitUnderTest.props().data).to.equal('0');
    });

    it('should accept value to 1001', () => {
      var unitUnderTest = mount(<DataInput data={'1001'}/>);
      var input = unitUnderTest.find('input');

      input.simulate('change');
      expect(unitUnderTest.props().data).to.equal('1001');
    });

    it('should reset value to 0', () => {
      var unitUnderTest = mount(<DataInput />);
      var input = unitUnderTest.find('input');

      unitUnderTest.setProps({data: '0'});
      input.simulate('change');

      expect(unitUnderTest.props().data).to.equal('0');
    });
});
