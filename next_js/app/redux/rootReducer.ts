// rootReducer.ts
import { combineReducers } from 'redux';
import userReducer from './slicers/userSlicer';
// import productReducer from './productReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;