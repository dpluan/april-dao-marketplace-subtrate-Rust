import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './rootReducer';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

// Define a type for the slice state
interface CounterState {
  allAccounts: InjectedAccountWithMeta[];
  value: number;
  currentAccount?: InjectedAccountWithMeta;
}

// Define the initial state using that type
const initialState: CounterState = {
  allAccounts: [],
  value: 0,
};

export const commonSlice = createSlice({
  name: 'common',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state: CounterState) => {
      state.value += 1;
    },
    setAllAccounts: (
      state: CounterState,
      action: PayloadAction<InjectedAccountWithMeta[]>
    ) => {
      state.allAccounts = action.payload;
    },
    setCurrentAccount: (
      state: CounterState,
      action: PayloadAction<InjectedAccountWithMeta>
    ) => {
      state.currentAccount = action.payload;
    },
  },
});

export const { increment, setAllAccounts, setCurrentAccount } =
  commonSlice.actions;

export default commonSlice;
