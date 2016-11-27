import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import MyButton from './index';

describe('<MyButton /> ', () => {
    it('Should render MyButton', () => {
      const unitUnderTest = mount(<MyButton />);

      expect(unitUnderTest.find('button[type="button"]').length).to.equal(1);
    });

    it('should have text set to "Add"', () => {
      const unitUnderTest = shallow(<MyButton text="Add"/>);
      const button = unitUnderTest.find('button');

      expect(button.text()).to.be.equal('Add');
    });

});
