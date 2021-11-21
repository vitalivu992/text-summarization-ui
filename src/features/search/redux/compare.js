import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SEARCH_COMPARE_BEGIN,
  SEARCH_COMPARE_SUCCESS,
  SEARCH_COMPARE_FAILURE,
  SEARCH_COMPARE_DISMISS_ERROR,
} from './constants';

export function compare(args = {}) {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: SEARCH_COMPARE_BEGIN,
    });
    const { search } = getState();
    const { question1, question2 } = search;

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(process.env.REACT_APP_API_ENDPOINT + '/api/compare?offset=0&limit=10' +
        (question1 && '&q1=' + question1)+
        (question2 && '&q2=' + question2));

      doRequest.then(
        (res) => {
          dispatch({
            type: SEARCH_COMPARE_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: SEARCH_COMPARE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissCompareError() {
  return {
    type: SEARCH_COMPARE_DISMISS_ERROR,
  };
}

export function useCompare(params) {
  const dispatch = useDispatch();

  const { comparePending, compareError } = useSelector(
    state => ({
      // question1: state.search.question1,
      // question2: state.search.question2,
      comparePending: state.search.comparePending,
      compareError: state.search.compareError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(compare(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissCompareError());
  }, [dispatch]);

  return {
    compare: boundAction,
    comparePending,
    compareError,
    dismissCompareError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SEARCH_COMPARE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        comparePending: true,
        compareError: null,
      };

    case SEARCH_COMPARE_SUCCESS:
      // The request is success
      return {
        ...state,
        comparePending: false,
        compareError: null,
        compareScores: action.data.scores,
        // question1: action.data.question1,
        // question2: action.data.question2,
        compareTime: action.data.compare_time,
      };

    case SEARCH_COMPARE_FAILURE:
      // The request is failed
      return {
        ...state,
        comparePending: false,
        compareError: action.data.error,
      };

    case SEARCH_COMPARE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        compareError: null,
      };

    default:
      return state;
  }
}
