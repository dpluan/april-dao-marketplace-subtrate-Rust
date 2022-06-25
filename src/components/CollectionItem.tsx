import React from 'react';
import { Link } from 'react-router-dom';
import MintTime from './MintTime';

interface CollectionItemProps {
  link: string;
  img: string;
  title: string;
  mintInfo?: MintInfo;
}

interface MintInfo {
  time?: string;
  numberOfItems: number;
  mintFee: number;
}

const CollectionItem: React.FC<CollectionItemProps> = ({
  link,
  img,
  title,
  mintInfo,
}) => {
  const renderMintInfor = (mint: MintInfo) => {
    return (
      <div>
        {mint.time && <MintTime time={mint.time} />}
        <div>
          <div>TOTAL ITEMS : {mint.numberOfItems}</div>
          <div>PRICE : {mint.mintFee}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="mr-2">
      <Link to={link}>
        <img className="rounded-md" src={img} alt="" />
        <p>{title}</p>
      </Link>

      {mintInfo && renderMintInfor(mintInfo)}
    </div>
  );
};

export default CollectionItem;
