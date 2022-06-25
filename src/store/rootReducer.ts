import { combineReducers } from '@reduxjs/toolkit';
import commonSlice from './commonSlice';
import collectionSlice from './collectionSlice';

const rootReducer = combineReducers({
  common: commonSlice.reducer,
  collection: collectionSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
