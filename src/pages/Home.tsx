import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CollectionItem from '../components/CollectionItem';
import { upcomingLaunches } from '../utils/constant';
import { convertNumber } from '../utils/helper';
import { getAllCollections } from '../utils/pallet-interact/chain_state';

const Home = () => {
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
      <section>
        <h2 className="text-white">Upcoming Launches</h2>
        <div className="upcoming-lauches flex">
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
                    time: new Date(convertNumber(startDate) * 1000).toString(),
                    mintFee: mintFee,
                  }}
                />
              );
            })}
        </div>
      </section>

      <section>
        <h2 className="text-white">Popular collections</h2>

        <div className="upcoming-lauches flex">
          {collections
            .filter(
              (item) =>
                item.projectStatus === 'Approved' &&
                new Date() > new Date(convertNumber(item.endDate) * 1000)
            )
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
      </section>
    </div>
  );
};

export default Home;
