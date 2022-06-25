import { useNavigate, useParams } from 'react-router-dom';
import { Line } from 'rc-progress';

import { Button } from '../../components/NormalButton';
import { useConnectWallet } from '../../hooks/useConnectWallet';
import ExtenalLink from '../../components/ExtenalLink';
import { useEffect, useState } from 'react';
import { getCollectionByHash } from '../../utils/pallet-interact/chain_state';
import { mint } from '../../utils/pallet-interact/extrinsic_call';
import { convertNumber } from '../../utils/helper';
import MintTime from '../../components/MintTime';

const Detail = () => {
  const [currentAccount, connectWallet] = useConnectWallet();
  let { collectionId } = useParams();
  const navigate = useNavigate();

  const [upcoming, setUpcoming] = useState<any>();

  useEffect(() => {
    const init = async () => {
      if (collectionId) {
        const collection = await getCollectionByHash(collectionId);
        setUpcoming(collection.toHuman());
      }
    };
    init();
  }, [collectionId]);

  const mintNFT = () => {
    if (currentAccount && collectionId) {
      mint(currentAccount, collectionId);
    }
  };

  const visit = () => {
    navigate(`/collections/${collectionId}`);
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <h1 className="text-white">{upcoming?.name}</h1>
          <div>PRICE : {upcoming?.mintFee} ◎</div>
          <div className="flex gap-1 mt-3">
            <a href="#" className="flex">
              <ExtenalLink />
              <span>Twitter</span>
            </a>
            <a href="#" className="flex">
              <ExtenalLink />
              <span>Discord</span>
            </a>
          </div>
          <p className="mt-6">{upcoming?.description}</p>
          <br />
        </div>
        <div className="w-1/2">
          <img
            src="https://bafybeihycbe5abcf7nxugeb3kddghnlr7wke2vlow2l3jurw7b4dgudw6i.ipfs.nftstorage.link/"
            alt="Hidden Boyz"
            className="rounded-md"
          />

          <div>
            <div className="flex justify-between">
              <div>Total minted</div>
              {upcoming && upcoming.numberOfItems && upcoming.numberOfMinted && (
                <div>
                  {(convertNumber(upcoming.numberOfMinted) /
                    convertNumber(upcoming.numberOfItems)) *
                    100}
                  % ({convertNumber(upcoming.numberOfMinted)}/
                  {convertNumber(upcoming.numberOfItems)})
                </div>
              )}
            </div>
            {upcoming && (
              <Line
                percent={
                  (convertNumber(upcoming.numberOfMinted) /
                    convertNumber(upcoming.numberOfItems)) *
                  100
                }
                strokeWidth={4}
                strokeColor="#e93a88"
              />
            )}
          </div>
          {upcoming && (
            <MintTime
              time={new Date(
                convertNumber(upcoming.startDate) * 1000
              ).toString()}
            />
          )}
          {upcoming &&
            convertNumber(upcoming.numberOfMinted) <
              convertNumber(upcoming.numberOfItems) &&
            new Date(convertNumber(upcoming.startDate) * 1000) <= new Date() &&
            new Date(convertNumber(upcoming.endDate) * 1000) >= new Date() && (
              <>
                {currentAccount && (
                  <Button className="w-full" onClick={mintNFT}>
                    Mint
                  </Button>
                )}
                {!currentAccount && (
                  <Button className="w-full" onClick={connectWallet}>
                    Connect wallet
                  </Button>
                )}
              </>
            )}
          {upcoming &&
            new Date(convertNumber(upcoming.endDate) * 1000) < new Date() && (
              <>
                <div className="mt-2">
                  <Button className="w-full" onClick={visit}>
                    Visit collection
                  </Button>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
