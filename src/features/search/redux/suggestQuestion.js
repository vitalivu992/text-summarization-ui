import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SEARCH_SUGGEST_QUESTION_BEGIN,
  SEARCH_SUGGEST_QUESTION_SUCCESS,
  SEARCH_SUGGEST_QUESTION_FAILURE,
  SEARCH_SUGGEST_QUESTION_DISMISS_ERROR,
} from './constants';

export function suggestQuestion(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: SEARCH_SUGGEST_QUESTION_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(process.env.REACT_APP_API_ENDPOINT + '/api/suggest')

      doRequest.then(
        (res) => {
          dispatch({
            type: SEARCH_SUGGEST_QUESTION_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: SEARCH_SUGGEST_QUESTION_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissSuggestQuestionError() {
  return {
    type: SEARCH_SUGGEST_QUESTION_DISMISS_ERROR,
  };
}

export function useSuggestQuestion() {
  const dispatch = useDispatch();

  const { suggestQuestionPending, suggestQuestionError } = useSelector(
    state => ({
      suggestQuestionPending: state.search.suggestQuestionPending,
      suggestQuestionError: state.search.suggestQuestionError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(suggestQuestion(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissSuggestQuestionError());
  }, [dispatch]);

  return {
    suggestQuestion: boundAction,
    suggestQuestionPending,
    suggestQuestionError,
    dismissSuggestQuestionError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SEARCH_SUGGEST_QUESTION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        suggestQuestionPending: true,
        suggestQuestionError: null,
      };

    case SEARCH_SUGGEST_QUESTION_SUCCESS:
      // The request is success
      return {
        ...state,
        suggest: action.data.question,
        suggestQuestionPending: false,
        suggestQuestionError: null,
      };

    case SEARCH_SUGGEST_QUESTION_FAILURE:
      // The request is failed
      return {
        ...state,
        suggestQuestionPending: false,
        suggestQuestionError: action.data.error,
      };

    case SEARCH_SUGGEST_QUESTION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        suggestQuestionError: null,
      };

    default:
      return state;
  }
}
