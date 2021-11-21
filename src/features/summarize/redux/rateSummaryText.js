import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SUMMARIZE_RATE_SUMMARY_TEXT_BEGIN,
  SUMMARIZE_RATE_SUMMARY_TEXT_SUCCESS,
  SUMMARIZE_RATE_SUMMARY_TEXT_FAILURE,
  SUMMARIZE_RATE_SUMMARY_TEXT_DISMISS_ERROR,
} from './constants';

export function rateSummaryText(goldSummary, computeSummary, args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: SUMMARIZE_RATE_SUMMARY_TEXT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/v1/rate',
        {
          'gold_summary': goldSummary,
          'compute_summary': computeSummary
        });
      doRequest.then(
        (res) => {
          dispatch({
            type: SUMMARIZE_RATE_SUMMARY_TEXT_SUCCESS,
            data: res.data.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: SUMMARIZE_RATE_SUMMARY_TEXT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissRateSummaryTextError() {
  return {
    type: SUMMARIZE_RATE_SUMMARY_TEXT_DISMISS_ERROR,
  };
}

export function useRateSumaryText() {
  const dispatch = useDispatch();

  const { rateSumaryTextPending, rateSumaryTextError } = useSelector(
    state => ({
      rateSumaryTextPending: state.summarize.rateSumaryTextPending,
      rateSumaryTextError: state.summarize.rateSumaryTextError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(rateSummaryText(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissRateSummaryTextError());
  }, [dispatch]);

  return {
    rateSummaryText: boundAction,
    rateSumaryTextPending,
    rateSumaryTextError,
    dismissRateSummaryTextError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SUMMARIZE_RATE_SUMMARY_TEXT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        rateSummaryTextPending: true,
        rateSummaryTextError: null,
      };

    case SUMMARIZE_RATE_SUMMARY_TEXT_SUCCESS:
      // The request is success
      return {
        ...state,
        rateSummaryTextPending: false,
        rateSummaryTextError: null,
        rouge1Score: action.data.rouge_1,
        rouge2Score: action.data.rouge_2,
        rougeLScore: action.data.rouge_l,
      };

    case SUMMARIZE_RATE_SUMMARY_TEXT_FAILURE:
      // The request is failed
      return {
        ...state,
        rateSummaryTextPending: false,
        rateSummaryTextError: action.data.error,
      };

    case SUMMARIZE_RATE_SUMMARY_TEXT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        rateSummaryTextError: null,
      };

    default:
      return state;
  }
}
