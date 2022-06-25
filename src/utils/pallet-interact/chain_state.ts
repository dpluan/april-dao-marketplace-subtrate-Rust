import { api } from '../functions';

export const getAllCollections = async () => {
  const now = await api.query.collectionModule.collections.entries();
  return now;
};

export const getCollectionByHash = async (hash: string) => {
  const now = await api.query.collectionModule.collections(hash);
  return now;
};

export const getNFTByCollectionId = async (collectionId: string) => {
  const now = await api.query.collectionModule.nfTs(collectionId, 0);
  return now;
};

export const getProposalsByCollectionId = async (collectionId: string) => {
  const now = await api.query.votingModule.proposals(collectionId);
  return now;
};

export const getVotesByCollectionId = async (collectionId: string) => {
  const now = await api.query.votingModule.votes(collectionId);
  return now;
};

export const getNftByAccount = async (
  currentAccount: string,
  collectionId: string
) => {
  const now = await api.query.collectionModule.collectionOwnerNFT(
    collectionId,
    currentAccount
  );
  return now;
};
