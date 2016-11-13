import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Input from '../src/input';

describe('<Input /> ', () => {
    it('Contains input html control of type="test"', () => {
      expect(shallow(<Input/>).contains('input type="text"').to.equal(true);
    });
});
