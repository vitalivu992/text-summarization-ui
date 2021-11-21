import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from '../../../src/features/search';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Layout />);
  expect(renderedComponent.find('.search-layout').length).toBe(1);
});
