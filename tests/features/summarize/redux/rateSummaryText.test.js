import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SUMMARIZE_RATE_SUMMARY_TEXT_BEGIN,
  SUMMARIZE_RATE_SUMMARY_TEXT_SUCCESS,
  SUMMARIZE_RATE_SUMMARY_TEXT_FAILURE,
  SUMMARIZE_RATE_SUMMARY_TEXT_DISMISS_ERROR,
} from '../../../../src/features/summarize/redux/constants';

import {
  rateSummaryText,
  dismissRateSummaryTextError,
  reducer,
} from '../../../../src/features/summarize/redux/rateSummaryText';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('summarize/redux/rateSummaryText', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when rateSummaryText succeeds', () => {
    const store = mockStore({});

    return store.dispatch(rateSummaryText())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SUMMARIZE_RATE_SUMMARY_TEXT_BEGIN);
        expect(actions[1]).toHaveProperty('type', SUMMARIZE_RATE_SUMMARY_TEXT_SUCCESS);
      });
  });

  it('dispatches failure action when rateSummaryText fails', () => {
    const store = mockStore({});

    return store.dispatch(rateSummaryText({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SUMMARIZE_RATE_SUMMARY_TEXT_BEGIN);
        expect(actions[1]).toHaveProperty('type', SUMMARIZE_RATE_SUMMARY_TEXT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissRateSummaryTextError', () => {
    const expectedAction = {
      type: SUMMARIZE_RATE_SUMMARY_TEXT_DISMISS_ERROR,
    };
    expect(dismissRateSummaryTextError()).toEqual(expectedAction);
  });

  it('handles action type SUMMARIZE_RATE_SUMMARY_TEXT_BEGIN correctly', () => {
    const prevState = { rateSummaryTextPending: false };
    const state = reducer(
      prevState,
      { type: SUMMARIZE_RATE_SUMMARY_TEXT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rateSummaryTextPending).toBe(true);
  });

  it('handles action type SUMMARIZE_RATE_SUMMARY_TEXT_SUCCESS correctly', () => {
    const prevState = { rateSummaryTextPending: true };
    const state = reducer(
      prevState,
      { type: SUMMARIZE_RATE_SUMMARY_TEXT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rateSummaryTextPending).toBe(false);
  });

  it('handles action type SUMMARIZE_RATE_SUMMARY_TEXT_FAILURE correctly', () => {
    const prevState = { rateSummaryTextPending: true };
    const state = reducer(
      prevState,
      { type: SUMMARIZE_RATE_SUMMARY_TEXT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rateSummaryTextPending).toBe(false);
    expect(state.rateSummaryTextError).toEqual(expect.anything());
  });

  it('handles action type SUMMARIZE_RATE_SUMMARY_TEXT_DISMISS_ERROR correctly', () => {
    const prevState = { rateSummaryTextError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SUMMARIZE_RATE_SUMMARY_TEXT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rateSummaryTextError).toBe(null);
  });
});

