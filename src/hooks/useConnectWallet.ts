import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { useDispatch, useSelector } from 'react-redux';
import { setAllAccounts, setCurrentAccount } from '../store/commonSlice';
import { RootState } from '../store/rootReducer';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

export const useConnectWallet = (): [
  InjectedAccountWithMeta | undefined,
  () => Promise<void>,
  InjectedAccountWithMeta[] | undefined
] => {
  const { currentAccount, allAccounts } = useSelector(
    (state: RootState) => state.common
  );
  const dispatch = useDispatch();

  const connectWallet = async () => {
    const allInjected = await web3Enable('AprilDao');
    const allAccounts = await web3Accounts();
    dispatch(setAllAccounts(allAccounts));
    dispatch(setCurrentAccount(allAccounts[0]));
  };
  return [currentAccount, connectWallet, allAccounts];
};
