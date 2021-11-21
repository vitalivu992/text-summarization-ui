import React from 'react';
import { shallow } from 'enzyme';
import { SearchPage } from '../../../src/features/search/SearchPage';

describe('search/SearchPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      search: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SearchPage {...props} />
    );

    expect(
      renderedComponent.find('.search-search-page').length
    ).toBe(1);
  });
});
