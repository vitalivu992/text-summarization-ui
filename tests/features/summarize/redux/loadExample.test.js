import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SUMMARIZE_LOAD_EXAMPLE_BEGIN,
  SUMMARIZE_LOAD_EXAMPLE_SUCCESS,
  SUMMARIZE_LOAD_EXAMPLE_FAILURE,
  SUMMARIZE_LOAD_EXAMPLE_DISMISS_ERROR,
} from '../../../../src/features/summarize/redux/constants';

import {
  loadExample,
  dismissLoadExampleError,
  reducer,
} from '../../../../src/features/summarize/redux/loadExample';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('summarize/redux/loadExample', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadExample succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadExample())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SUMMARIZE_LOAD_EXAMPLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', SUMMARIZE_LOAD_EXAMPLE_SUCCESS);
      });
  });

  it('dispatches failure action when loadExample fails', () => {
    const store = mockStore({});

    return store.dispatch(loadExample({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SUMMARIZE_LOAD_EXAMPLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', SUMMARIZE_LOAD_EXAMPLE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadExampleError', () => {
    const expectedAction = {
      type: SUMMARIZE_LOAD_EXAMPLE_DISMISS_ERROR,
    };
    expect(dismissLoadExampleError()).toEqual(expectedAction);
  });

  it('handles action type SUMMARIZE_LOAD_EXAMPLE_BEGIN correctly', () => {
    const prevState = { loadExamplePending: false };
    const state = reducer(
      prevState,
      { type: SUMMARIZE_LOAD_EXAMPLE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadExamplePending).toBe(true);
  });

  it('handles action type SUMMARIZE_LOAD_EXAMPLE_SUCCESS correctly', () => {
    const prevState = { loadExamplePending: true };
    const state = reducer(
      prevState,
      { type: SUMMARIZE_LOAD_EXAMPLE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadExamplePending).toBe(false);
  });

  it('handles action type SUMMARIZE_LOAD_EXAMPLE_FAILURE correctly', () => {
    const prevState = { loadExamplePending: true };
    const state = reducer(
      prevState,
      { type: SUMMARIZE_LOAD_EXAMPLE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadExamplePending).toBe(false);
    expect(state.loadExampleError).toEqual(expect.anything());
  });

  it('handles action type SUMMARIZE_LOAD_EXAMPLE_DISMISS_ERROR correctly', () => {
    const prevState = { loadExampleError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SUMMARIZE_LOAD_EXAMPLE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadExampleError).toBe(null);
  });
});

