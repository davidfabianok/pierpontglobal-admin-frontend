import { combineReducers } from 'redux';
import auth from 'auth/store/reducers';
import fuse from './fuse';

const createReducer = asyncReducers => combineReducers({
  auth,
  fuse,
  ...asyncReducers,
});

export default createReducer;
