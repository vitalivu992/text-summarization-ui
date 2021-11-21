import React from 'react';
import { shallow } from 'enzyme';
import { SidePanel } from '../../../src/features/sumarization';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SidePanel />);
  expect(renderedComponent.find('.sumarization-side-panel').length).toBe(1);
});
