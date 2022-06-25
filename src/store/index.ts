import { configureStore } from '@reduxjs/toolkit';
import commonSlice from './commonSlice';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
