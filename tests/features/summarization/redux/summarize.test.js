import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SUMMARIZE_SUMMARIZE_BEGIN,
  SUMMARIZE_SUMMARIZE_SUCCESS,
  SUMMARIZE_SUMMARIZE_FAILURE,
  SUMMARIZE_SUMMARIZE_DISMISS_ERROR,
} from '../../../../src/features/summarize/redux/constants';

import {
  summarize,
  dismissSummarizeError,
  reducer,
} from '../../../../src/features/summarize/redux/summarize';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('summarize/redux/summarize', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when summarize succeeds', () => {
    const store = mockStore({});

    return store.dispatch(summarize())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SUMMARIZE_SUMMARIZE_BEGIN);
        expect(actions[1]).toHaveProperty('type', SUMMARIZE_SUMMARIZE_SUCCESS);
      });
  });

  it('dispatches failure action when summarize fails', () => {
    const store = mockStore({});

    return store.dispatch(summarize({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SUMMARIZE_SUMMARIZE_BEGIN);
        expect(actions[1]).toHaveProperty('type', SUMMARIZE_SUMMARIZE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSummarizeError', () => {
    const expectedAction = {
      type: SUMMARIZE_SUMMARIZE_DISMISS_ERROR,
    };
    expect(dismissSummarizeError()).toEqual(expectedAction);
  });

  it('handles action type SUMMARIZE_SUMMARIZE_BEGIN correctly', () => {
    const prevState = { summarizePending: false };
    const state = reducer(
      prevState,
      { type: SUMMARIZE_SUMMARIZE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.summarizePending).toBe(true);
  });

  it('handles action type SUMMARIZE_SUMMARIZE_SUCCESS correctly', () => {
    const prevState = { summarizePending: true };
    const state = reducer(
      prevState,
      { type: SUMMARIZE_SUMMARIZE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.summarizePending).toBe(false);
  });

  it('handles action type SUMMARIZE_SUMMARIZE_FAILURE correctly', () => {
    const prevState = { summarizePending: true };
    const state = reducer(
      prevState,
      { type: SUMMARIZE_SUMMARIZE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.summarizePending).toBe(false);
    expect(state.summarizeError).toEqual(expect.anything());
  });

  it('handles action type SUMMARIZE_SUMMARIZE_DISMISS_ERROR correctly', () => {
    const prevState = { summarizeError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SUMMARIZE_SUMMARIZE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.summarizeError).toBe(null);
  });
});

