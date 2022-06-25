import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useConnectWallet } from '../../hooks/useConnectWallet';
import { getNFTByCollectionId } from '../../utils/pallet-interact/chain_state';

const Detail = () => {
  const [currentAccount, connectWallet] = useConnectWallet();
  let { collectionId } = useParams();

  useEffect(() => {
    const init = async () => {
      if (collectionId) {
        const NFTs = await getNFTByCollectionId(collectionId);
        console.log(NFTs.toHuman());
      }
    };
    init();
  }, [collectionId]);

  return <div>Detail</div>;
};

export default Detail;
