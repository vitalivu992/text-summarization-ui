import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SEARCH_DO_SEARCH_BEGIN,
  SEARCH_DO_SEARCH_SUCCESS,
  SEARCH_DO_SEARCH_FAILURE,
  SEARCH_DO_SEARCH_DISMISS_ERROR,
} from '../../../../src/features/search/redux/constants';

import {
  doSearch,
  dismissDoSearchError,
  reducer,
} from '../../../../src/features/search/redux/doSearch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('search/redux/doSearch', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when doSearch succeeds', () => {
    const store = mockStore({});

    return store.dispatch(doSearch())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SEARCH_DO_SEARCH_BEGIN);
        expect(actions[1]).toHaveProperty('type', SEARCH_DO_SEARCH_SUCCESS);
      });
  });

  it('dispatches failure action when doSearch fails', () => {
    const store = mockStore({});

    return store.dispatch(doSearch({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SEARCH_DO_SEARCH_BEGIN);
        expect(actions[1]).toHaveProperty('type', SEARCH_DO_SEARCH_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDoSearchError', () => {
    const expectedAction = {
      type: SEARCH_DO_SEARCH_DISMISS_ERROR,
    };
    expect(dismissDoSearchError()).toEqual(expectedAction);
  });

  it('handles action type SEARCH_DO_SEARCH_BEGIN correctly', () => {
    const prevState = { doSearchPending: false };
    const state = reducer(
      prevState,
      { type: SEARCH_DO_SEARCH_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.doSearchPending).toBe(true);
  });

  it('handles action type SEARCH_DO_SEARCH_SUCCESS correctly', () => {
    const prevState = { doSearchPending: true };
    const state = reducer(
      prevState,
      { type: SEARCH_DO_SEARCH_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.doSearchPending).toBe(false);
  });

  it('handles action type SEARCH_DO_SEARCH_FAILURE correctly', () => {
    const prevState = { doSearchPending: true };
    const state = reducer(
      prevState,
      { type: SEARCH_DO_SEARCH_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.doSearchPending).toBe(false);
    expect(state.doSearchError).toEqual(expect.anything());
  });

  it('handles action type SEARCH_DO_SEARCH_DISMISS_ERROR correctly', () => {
    const prevState = { doSearchError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SEARCH_DO_SEARCH_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.doSearchError).toBe(null);
  });
});

