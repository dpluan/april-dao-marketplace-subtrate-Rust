import React, { useEffect, useState } from 'react';
import CollectionItem from '../../components/CollectionItem';
import { getAllCollections } from '../../utils/pallet-interact/chain_state';

const Admin = () => {
  const [collections, setCollections] = useState<any[]>([]);
  useEffect(() => {
    const init = async () => {
      const allCollections = await getAllCollections();
      setCollections(
        allCollections.map(([_, value]) => {
          console.log(value.toHuman());
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
          .filter((item) => item.projectStatus === 'Draft')
          .map(({ id, name, numberOfItems, mintFee }, index) => {
            return (
              <CollectionItem
                key={index}
                link={`/admin/apply/${id}`}
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

export default Admin;
