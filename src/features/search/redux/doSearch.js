import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SEARCH_DO_SEARCH_BEGIN,
  SEARCH_DO_SEARCH_SUCCESS,
  SEARCH_DO_SEARCH_FAILURE,
  SEARCH_DO_SEARCH_DISMISS_ERROR,
} from './constants';

export function doSearch(args = {}) {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: SEARCH_DO_SEARCH_BEGIN,
    });
    const { search } = getState();
    const { random, altSearch, query } = search;


    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(process.env.REACT_APP_API_ENDPOINT + '/api/search?offset=0&limit=10' +
        (random ? '&random=true' : '') +
        (altSearch ? '&alt=true' : '') +
        (query && '&q=' + query));
      doRequest.then(
        (res) => {
          dispatch({
            type: SEARCH_DO_SEARCH_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: SEARCH_DO_SEARCH_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDoSearchError() {
  return {
    type: SEARCH_DO_SEARCH_DISMISS_ERROR,
  };
}

export function useHandleSubmit(params) {
  const dispatch = useDispatch();

  const { query, handleSubmitPending, handleSubmitError } = useSelector(
    state => ({
      query: state.search.query,
      handleSubmitPending: state.search.handleSubmitPending,
      handleSubmitError: state.search.handleSubmitError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(doSearch(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDoSearchError());
  }, [dispatch]);

  return {
    query,
    doSearch: boundAction,
    handleSubmitPending,
    handleSubmitError,
    dismissDoSearchError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SEARCH_DO_SEARCH_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        doSearchPending: true,
        doSearchError: null,
      };

    case SEARCH_DO_SEARCH_SUCCESS:
      // The request is success
      return {
        ...state,
        doSearchPending: false,
        doSearchError: null,
        similars: action.data.similars,
        question: action.data.question,
        queryTime: action.data.query_time,
      };

    case SEARCH_DO_SEARCH_FAILURE:
      // The request is failed
      return {
        ...state,
        doSearchPending: false,
        doSearchError: action.data.error,
      };

    case SEARCH_DO_SEARCH_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        doSearchError: null,
      };

    default:
      return state;
  }
}
