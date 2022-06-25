import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useConnectWallet } from '../../hooks/useConnectWallet';
import {
  getNftByAccount,
  getProposalsByCollectionId,
  getVotesByCollectionId,
} from '../../utils/pallet-interact/chain_state';
import {
  execute_proposal,
  nay,
  yay,
} from '../../utils/pallet-interact/extrinsic_call';

const ProposalDetail: React.FC<{
  title: string;
  status: string;
  owner: string;
  description: string;
}> = ({ title, owner, description, status }) => {
  const [currentAccount, connectWallet] = useConnectWallet();
  const [votes, setVotes] = useState<any>();
  const [proposal, setProposal] = useState<any>();
  let { collectionId, proposalId } = useParams();
  const [nftId, setNftId] = useState<string[]>([]);

  useEffect(() => {
    const init = async () => {
      if (collectionId) {
        const all = await getProposalsByCollectionId(collectionId);
        setProposal(all.toHuman());

        const collection = await getVotesByCollectionId(collectionId);
        setVotes(collection.toHuman());
      }
    };

    init();
  }, [collectionId]);

  useEffect(() => {
    const init = async () => {
      if (collectionId && currentAccount) {
        const nfts = await getNftByAccount(
          currentAccount?.address,
          collectionId
        );
        setNftId(nfts.toHuman() as string[]);
      }
    };

    init();
  }, [collectionId, currentAccount]);

  const onYay = async () => {
    if (currentAccount && collectionId && proposalId) {
      await yay(currentAccount, collectionId, proposalId, nftId[0]);
    }
  };

  const onNay = async () => {
    if (currentAccount && collectionId && proposalId) {
      await nay(currentAccount, collectionId, proposalId, nftId[0]);
    }
  };

  const withdraw = async () => {
    if (currentAccount && collectionId && proposalId) {
      await execute_proposal(currentAccount, proposalId);
    }
  };

  return (
    <div className="flex">
      <div className="w-2/3">
        <Link
          to={`/collections/${collectionId}/proposals`}
          className="flex text-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </Link>
        <br />
        <h1 className="text-white text-xl">
          {proposal && `#${proposal.assetId} Treasury Payout for Development`}
        </h1>
        <span className="rounded-lg bg-green-400 text-white px-3 py-2">
          Open
        </span>
        <div>{owner}</div>
        <br />
        <p>{proposal && proposal.description}</p>
      </div>
      <div className="w-1/3">
        <section className="border border-gray-400 rounded-md p-3">
          <h3 className="text-white font-bold text-lg">Voting results</h3>
          {votes && (
            <ul>
              <li>
                Yay : {votes.filter((item: any) => item.isAccepted).length} (
                {(Number(votes.filter((item: any) => item.isAccepted).length) /
                  votes.length) *
                  100}
                %)
              </li>
              <li>
                Nay : {votes.filter((item: any) => !item.isAccepted).length} (
                {(Number(votes.filter((item: any) => !item.isAccepted).length) /
                  votes.length) *
                  100}
                %)
              </li>
              <li>Total votes : {votes.length}</li>
            </ul>
          )}
          {currentAccount && (
            <>
              <Button onClick={onYay} className="mr-2">
                Yes
              </Button>
              <Button onClick={onNay}>No</Button>
            </>
          )}
          {currentAccount && (
            <>
              <Button onClick={withdraw} className="mr-2">
                Withdraw
              </Button>
            </>
          )}
          {!currentAccount && (
            <Button onClick={connectWallet}>Connect wallet</Button>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProposalDetail;
