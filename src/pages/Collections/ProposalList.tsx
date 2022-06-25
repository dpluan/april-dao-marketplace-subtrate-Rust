import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useConnectWallet } from '../../hooks/useConnectWallet';
import {
  getCollectionByHash,
  getProposalsByCollectionId,
} from '../../utils/pallet-interact/chain_state';

const ProposalList = () => {
  const [currentAccount, connectWallet] = useConnectWallet();
  const [proposals, setProposals] = useState<any[]>();
  const [currentCollection, setCurrentCollection] = useState<any>();
  const navigate = useNavigate();
  let { collectionId } = useParams();

  useEffect(() => {
    const init = async () => {
      if (collectionId) {
        const value = await getProposalsByCollectionId(collectionId);
        setProposals([value.toHuman()]);

        const collection = await getCollectionByHash(collectionId);
        setCurrentCollection(collection.toHuman());
      }
    };

    init();
  }, [collectionId]);

  const onCreateProposal = () => {
    navigate(`/collections/${collectionId}/proposals/create`);
  };

  return (
    <div className="container">
      {currentCollection &&
        currentCollection.owner === currentAccount?.address && (
          <Button onClick={onCreateProposal}>Create new proposal</Button>
        )}
      {!currentAccount && (
        <Button onClick={connectWallet}>Connect wallet</Button>
      )}
      <ul>
        {collectionId &&
          proposals &&
          proposals.map((item, index) => {
            return (
              item && (
                <li key={index}>
                  <Link
                    to={`/collections/${collectionId}/proposals/${item.assetId}`}
                  >
                    <div className="flex justify-between">
                      <span>{item.owner}</span>
                      <span className="rounded-lg bg-green-400 text-white px-3 py-2">
                        Active
                      </span>
                    </div>
                    <h1 className="text-white text-xl">
                      {`#${item.assetId} Treasury Payout for Development`}
                    </h1>
                    <p className="text-yellow-200">{item.description}</p>
                  </Link>
                </li>
              )
            );
          })}
      </ul>
    </div>
  );
};

export default ProposalList;
