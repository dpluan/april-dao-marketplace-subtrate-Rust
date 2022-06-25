import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collection } from '../models/Collection';
import { upcomingLaunches } from '../utils/constant';

interface CollectionState {
  upcommingCollections: Collection[];
}

const initialState: CollectionState = {
  upcommingCollections: upcomingLaunches,
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setAllAccounts: (
      state: CollectionState,
      action: PayloadAction<Collection[]>
    ) => {
      state.upcommingCollections = action.payload;
    },
  },
});

export const { setAllAccounts } = collectionSlice.actions;

export default collectionSlice;
