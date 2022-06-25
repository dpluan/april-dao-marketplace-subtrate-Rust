import React, { useEffect, useState } from 'react';
import CollectionItem from '../../components/CollectionItem';
import { getAllCollections } from '../../utils/pallet-interact/chain_state';

const index = () => {
  const [collections, setCollections] = useState<any[]>([]);
  useEffect(() => {
    const init = async () => {
      const allCollections = await getAllCollections();
      setCollections(
        allCollections.map(([_, value]) => {
          return value.toHuman();
        })
      );
    };

    init();
  }, []);
  return (
    <div>
      {/* <h1>Upcoming</h1> */}
      <div className="collection-list flex">
        {collections
          .filter((item) => item.projectStatus === 'Approved')
          .map(({ id, name, numberOfItems, mintFee, startDate }, index) => {
            return (
              <CollectionItem
                key={index}
                link={`/launchpad/${id}`}
                title={name}
                img="https://img-cdn.magiceden.dev/rs:fill:252:189:0:0/plain/https:/i.imgur.com/WCpkZUH.jpg"
                mintInfo={{
                  numberOfItems: numberOfItems,
                  time: new Date(
                    startDate.replaceAll(',', '') * 1000
                  ).toString(),
                  mintFee: mintFee,
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default index;
