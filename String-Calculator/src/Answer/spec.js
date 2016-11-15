import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Answer from './index';

describe('<Answer /> ', () => {
    it('Should render Answer', () => {
      const unitUnderTest = shallow(<Answer />);

      expect(unitUnderTest.contains(<input type="text" id="answer"/>)).to.equal(true);
    });
});
