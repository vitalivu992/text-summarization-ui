import React from 'react';
import { shallow } from 'enzyme';
import { ToolPage } from '../../../src/features/summarize/ToolPage';

describe('summarize/ToolPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      summarize: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ToolPage {...props} />
    );

    expect(
      renderedComponent.find('.summarize-tool-page').length
    ).toBe(1);
  });
});
