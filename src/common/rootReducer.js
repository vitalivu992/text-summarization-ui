import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import { connectRouter } from 'connected-react-router'
import history from './history';
import landingReducer from '../features/landing/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import summarizeReducer from '../features/summarize/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  router: connectRouter(history),
  landing: landingReducer,
  common: commonReducer,
  summarize: summarizeReducer,
};

export default combineReducers(reducerMap);
