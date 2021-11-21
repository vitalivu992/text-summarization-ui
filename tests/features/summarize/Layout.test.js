import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from '../../../src/features/sumarization';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Layout />);
  expect(renderedComponent.find('.sumarization-layout').length).toBe(1);
});
