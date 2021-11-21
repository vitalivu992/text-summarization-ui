import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SUMMARIZE_SUMMARIZE_BEGIN,
  SUMMARIZE_SUMMARIZE_SUCCESS,
  SUMMARIZE_SUMMARIZE_FAILURE,
  SUMMARIZE_SUMMARIZE_DISMISS_ERROR,
} from './constants';

export function summarize(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: SUMMARIZE_SUMMARIZE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {

      const doRequest = axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/v1/summary');
      doRequest.then(
        (res) => {
          dispatch({
            type: SUMMARIZE_SUMMARIZE_SUCCESS,
            data: res.data.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: SUMMARIZE_SUMMARIZE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissSummarizeError() {
  return {
    type: SUMMARIZE_SUMMARIZE_DISMISS_ERROR,
  };
}

export function useSummarize(params) {
  const dispatch = useDispatch();

  const { summarizePending, summarizeError } = useSelector(
    state => ({
      summarizePending: state.summarize.summarizePending,
      summarizeError: state.summarize.summarizeError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(summarize(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissSummarizeError());
  }, [dispatch]);

  return {
    summarize: boundAction,
    summarizePending,
    summarizeError,
    dismissSummarizeError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SUMMARIZE_SUMMARIZE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        summarizePending: true,
        summarizeError: null,
      };

    case SUMMARIZE_SUMMARIZE_SUCCESS:
      // The request is success
      return {
        ...state,
        summarizePending: false,
        summarizeError: null,
        computeSummary: action.data.compute_summary
      };

    case SUMMARIZE_SUMMARIZE_FAILURE:
      // The request is failed
      return {
        ...state,
        summarizePending: false,
        summarizeError: action.data.error,
      };

    case SUMMARIZE_SUMMARIZE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        summarizeError: null,
      };

    default:
      return state;
  }
}
