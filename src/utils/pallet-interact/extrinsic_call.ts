import { web3FromSource } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { toast } from 'react-toastify';
import { api } from '../functions';

const txResHandler = ({ status }: any) => {
  console.log(status);
  toast.success('Applied successfully!');
};

export const registerCollection = async (
  currentAccount: InjectedAccountWithMeta,
  projectName: string,
  description: string,
  numberOfItems: number,
  mintFee: number
) => {
  const injector = await web3FromSource(currentAccount.meta.source);
  await api.tx.collectionModule
    .registerCollection(projectName, description, numberOfItems, mintFee)
    .signAndSend(
      currentAccount?.address,
      {
        signer: injector.signer,
      },
      txResHandler
    );
};

export const approve_collection = async (
  currentAccount: InjectedAccountWithMeta,
  collectionId: string,
  startDate: number,
  endDate: number
) => {
  console.log(startDate);
  console.log(endDate);
  const injector = await web3FromSource(currentAccount.meta.source);
  await api.tx.collectionModule
    .approveCollection(collectionId, startDate, endDate)
    .signAndSend(
      currentAccount?.address,
      {
        signer: injector.signer,
      },
      txResHandler
    );
};

export const bindAssetToNft = async (
  currentAccount: InjectedAccountWithMeta,
  collectionId: string
) => {
  const injector = await web3FromSource(currentAccount.meta.source);
  await api.tx.votingModule
    .bindAssetToNft(collectionId, collectionId)
    .signAndSend(
      currentAccount?.address,
      {
        signer: injector.signer,
      },
      txResHandler
    );
};

export const mint = async (
  currentAccount: InjectedAccountWithMeta,
  collectionId: string
) => {
  const injector = await web3FromSource(currentAccount.meta.source);
  await api.tx.collectionModule.mint(collectionId).signAndSend(
    currentAccount?.address,
    {
      signer: injector.signer,
    },
    txResHandler
  );
};

export const createProposal = async (
  currentAccount: InjectedAccountWithMeta,
  collectionId: string,
  title: string,
  description: string,
  withdrawAmount: number,
  withdrawAddress: string,
  expiredAt: number
) => {
  const injector = await web3FromSource(currentAccount.meta.source);
  const proposalId = collectionId;
  const assetId = collectionId;
  await api.tx.votingModule
    .createProposal(
      proposalId,
      collectionId,
      assetId,
      withdrawAmount,
      withdrawAddress,
      title,
      description,
      expiredAt
    )
    .signAndSend(
      currentAccount?.address,
      {
        signer: injector.signer,
      },
      txResHandler
    );
};

export const submit_refund_proposal = async (
  currentAccount: InjectedAccountWithMeta,
  collectionId: string
) => {
  const injector = await web3FromSource(currentAccount.meta.source);
  await api.tx.collectionModule
    .submit_refund_proposal(collectionId)
    .signAndSend(
      currentAccount?.address,
      {
        signer: injector.signer,
      },
      txResHandler
    );
};

export const cast_vote = async (
  currentAccount: InjectedAccountWithMeta,
  collectionId: string
) => {
  const injector = await web3FromSource(currentAccount.meta.source);
  await api.tx.collectionModule.cast_vote(collectionId).signAndSend(
    currentAccount?.address,
    {
      signer: injector.signer,
    },
    txResHandler
  );
};

export const yay = async (
  currentAccount: InjectedAccountWithMeta,
  collectionId: string,
  proposalId: string,
  nftId: string
) => {
  console.log(proposalId, false, collectionId, nftId);
  const injector = await web3FromSource(currentAccount.meta.source);
  await api.tx.votingModule
    .vote(proposalId, true, collectionId, nftId)
    .signAndSend(
      currentAccount?.address,
      {
        signer: injector.signer,
      },
      txResHandler
    );
};

export const nay = async (
  currentAccount: InjectedAccountWithMeta,
  collectionId: string,
  proposalId: string,
  nftId: string
) => {
  console.log(proposalId, false, collectionId, nftId);
  const injector = await web3FromSource(currentAccount.meta.source);
  await api.tx.votingModule
    .vote(proposalId, false, collectionId, nftId)
    .signAndSend(
      currentAccount?.address,
      {
        signer: injector.signer,
      },
      txResHandler
    );
};

export const execute_proposal = async (
  currentAccount: InjectedAccountWithMeta,
  proposalId: string
) => {
  const injector = await web3FromSource(currentAccount.meta.source);
  await api.tx.votingModule.execute(proposalId).signAndSend(
    currentAccount?.address,
    {
      signer: injector.signer,
    },
    txResHandler
  );
};
