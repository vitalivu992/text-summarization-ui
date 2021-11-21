import React from 'react';
import { shallow } from 'enzyme';
import { ComparePage } from '../../../src/features/search/ComparePage';

describe('search/ComparePage', () => {
  it('renders node with correct class name', () => {
    const props = {
      search: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ComparePage {...props} />
    );

    expect(
      renderedComponent.find('.search-compare-page').length
    ).toBe(1);
  });
});
