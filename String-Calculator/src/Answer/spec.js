import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Answer from './index';

describe('<Answer /> ', () => {
    it('Should render Answer', () => {
      const unitUnderTest = mount(<Answer />);

      expect(unitUnderTest.find("input[id='answer']").length).to.equal(1);
    });
});
