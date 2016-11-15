import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import DataInput from './index';

describe('<DataInput /> ', () => {

    it('Should render <DataInput />', () => {
      const unitUnderTest = mount(<DataInput />);

      expect(unitUnderTest.find('MyButton').length).to.equal(1);
    });

    it('should start with empty', () => {
      const unitUnderTest = shallow(<DataInput />);

      expect(unitUnderTest.state('value')).to.equal('')
    });

    it('should accept value to 1001', () => {
      const unitUnderTest = shallow(<DataInput />);
      const input = unitUnderTest.find('input');

      input.simulate('change', {target: { value: '1001' }});
      expect(unitUnderTest.state('value')).to.equal('1001');
    });

    it('should reset value to 0', () => {
      const unitUnderTest = shallow(<DataInput />);
      const mybutton = unitUnderTest.find('MyButton');

      mybutton.simulate('click', {target: { value: '1001' }});
      expect(unitUnderTest.state('value')).to.equal('0');
    });
});
