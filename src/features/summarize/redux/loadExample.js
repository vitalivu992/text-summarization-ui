import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SUMMARIZE_LOAD_EXAMPLE_BEGIN,
  SUMMARIZE_LOAD_EXAMPLE_SUCCESS,
  SUMMARIZE_LOAD_EXAMPLE_FAILURE,
  SUMMARIZE_LOAD_EXAMPLE_DISMISS_ERROR,
} from './constants';

export function loadExample(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: SUMMARIZE_LOAD_EXAMPLE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(process.env.REACT_APP_API_ENDPOINT + '/api/v1/example');

      doRequest.then(
        (res) => {
          dispatch({
            type: SUMMARIZE_LOAD_EXAMPLE_SUCCESS,
            data: res.data.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: SUMMARIZE_LOAD_EXAMPLE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoadExampleError() {
  return {
    type: SUMMARIZE_LOAD_EXAMPLE_DISMISS_ERROR,
  };
}

export function useLoadExample(params) {
  const dispatch = useDispatch();

  const { loadExamplePending, loadExampleError } = useSelector(
    state => ({
      loadExamplePending: state.summarize.loadExamplePending,
      loadExampleError: state.summarize.loadExampleError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(loadExample(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissLoadExampleError());
  }, [dispatch]);

  return {
    loadExample: boundAction,
    loadExamplePending,
    loadExampleError,
    dismissLoadExampleError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SUMMARIZE_LOAD_EXAMPLE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadExamplePending: true,
        loadExampleError: null,
      };

    case SUMMARIZE_LOAD_EXAMPLE_SUCCESS:
      // The request is success
      return {
        ...state,
        loadExamplePending: false,
        loadExampleError: null,
        article: action.data.article,
        goldSummary: action.data.gold_summary,
      };

    case SUMMARIZE_LOAD_EXAMPLE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadExamplePending: false,
        loadExampleError: action.data.error,
      };

    case SUMMARIZE_LOAD_EXAMPLE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadExampleError: null,
      };

    default:
      return state;
  }
}
