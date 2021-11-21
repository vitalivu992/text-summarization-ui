import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SEARCH_SUGGEST_QUESTION_BEGIN,
  SEARCH_SUGGEST_QUESTION_SUCCESS,
  SEARCH_SUGGEST_QUESTION_FAILURE,
  SEARCH_SUGGEST_QUESTION_DISMISS_ERROR,
} from '../../../../src/features/search/redux/constants';

import {
  suggestQuestion,
  dismissSuggestQuestionError,
  reducer,
} from '../../../../src/features/search/redux/suggestQuestion';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('search/redux/suggestQuestion', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when suggestQuestion succeeds', () => {
    const store = mockStore({});

    return store.dispatch(suggestQuestion())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SEARCH_SUGGEST_QUESTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', SEARCH_SUGGEST_QUESTION_SUCCESS);
      });
  });

  it('dispatches failure action when suggestQuestion fails', () => {
    const store = mockStore({});

    return store.dispatch(suggestQuestion({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SEARCH_SUGGEST_QUESTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', SEARCH_SUGGEST_QUESTION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSuggestQuestionError', () => {
    const expectedAction = {
      type: SEARCH_SUGGEST_QUESTION_DISMISS_ERROR,
    };
    expect(dismissSuggestQuestionError()).toEqual(expectedAction);
  });

  it('handles action type SEARCH_SUGGEST_QUESTION_BEGIN correctly', () => {
    const prevState = { suggestQuestionPending: false };
    const state = reducer(
      prevState,
      { type: SEARCH_SUGGEST_QUESTION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.suggestQuestionPending).toBe(true);
  });

  it('handles action type SEARCH_SUGGEST_QUESTION_SUCCESS correctly', () => {
    const prevState = { suggestQuestionPending: true };
    const state = reducer(
      prevState,
      { type: SEARCH_SUGGEST_QUESTION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.suggestQuestionPending).toBe(false);
  });

  it('handles action type SEARCH_SUGGEST_QUESTION_FAILURE correctly', () => {
    const prevState = { suggestQuestionPending: true };
    const state = reducer(
      prevState,
      { type: SEARCH_SUGGEST_QUESTION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.suggestQuestionPending).toBe(false);
    expect(state.suggestQuestionError).toEqual(expect.anything());
  });

  it('handles action type SEARCH_SUGGEST_QUESTION_DISMISS_ERROR correctly', () => {
    const prevState = { suggestQuestionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SEARCH_SUGGEST_QUESTION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.suggestQuestionError).toBe(null);
  });
});

