import React, { useEffect, useState } from 'react';
import CollectionItem from '../../components/CollectionItem';
import { convertNumber } from '../../utils/helper';
import { getAllCollections } from '../../utils/pallet-interact/chain_state';

const Collections = () => {
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
      <div className="collection-list flex">
        {collections
          .filter((item) => item.projectStatus === 'Approved')
          .map(({ id, name, numberOfItems, mintFee, startDate }, index) => {
            return (
              <CollectionItem
                key={index}
                link={`/collections/${id}/proposals`}
                title={name}
                img="https://img-cdn.magiceden.dev/rs:fill:252:189:0:0/plain/https:/i.imgur.com/WCpkZUH.jpg"
                mintInfo={{
                  numberOfItems: numberOfItems,
                  mintFee: mintFee,
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Collections;
