import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SEARCH_COMPARE_BEGIN,
  SEARCH_COMPARE_SUCCESS,
  SEARCH_COMPARE_FAILURE,
  SEARCH_COMPARE_DISMISS_ERROR,
} from '../../../../src/features/search/redux/constants';

import {
  compare,
  dismissCompareError,
  reducer,
} from '../../../../src/features/search/redux/compare';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('search/redux/compare', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when compare succeeds', () => {
    const store = mockStore({});

    return store.dispatch(compare())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SEARCH_COMPARE_BEGIN);
        expect(actions[1]).toHaveProperty('type', SEARCH_COMPARE_SUCCESS);
      });
  });

  it('dispatches failure action when compare fails', () => {
    const store = mockStore({});

    return store.dispatch(compare({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SEARCH_COMPARE_BEGIN);
        expect(actions[1]).toHaveProperty('type', SEARCH_COMPARE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCompareError', () => {
    const expectedAction = {
      type: SEARCH_COMPARE_DISMISS_ERROR,
    };
    expect(dismissCompareError()).toEqual(expectedAction);
  });

  it('handles action type SEARCH_COMPARE_BEGIN correctly', () => {
    const prevState = { comparePending: false };
    const state = reducer(
      prevState,
      { type: SEARCH_COMPARE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.comparePending).toBe(true);
  });

  it('handles action type SEARCH_COMPARE_SUCCESS correctly', () => {
    const prevState = { comparePending: true };
    const state = reducer(
      prevState,
      { type: SEARCH_COMPARE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.comparePending).toBe(false);
  });

  it('handles action type SEARCH_COMPARE_FAILURE correctly', () => {
    const prevState = { comparePending: true };
    const state = reducer(
      prevState,
      { type: SEARCH_COMPARE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.comparePending).toBe(false);
    expect(state.compareError).toEqual(expect.anything());
  });

  it('handles action type SEARCH_COMPARE_DISMISS_ERROR correctly', () => {
    const prevState = { compareError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SEARCH_COMPARE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.compareError).toBe(null);
  });
});

