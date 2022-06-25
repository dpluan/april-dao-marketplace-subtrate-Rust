export interface Collection {
  img: string;
  id: number;
  title: string;
  description: string;
  mintInfor: {
    time: string;
    numberOfItems: number;
    mintFee: number;
  };
}
