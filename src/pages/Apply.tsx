import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../components/NormalButton';
import { useConnectWallet } from '../hooks/useConnectWallet';
import { getAllCollections } from '../utils/pallet-interact/chain_state';
import { registerCollection } from '../utils/pallet-interact/extrinsic_call';

type Inputs = {
  collection_name: string;
  description: string;
  numberOfItems: number;
  mintFee: number;
};

const Apply = () => {
  const [currentAccount, connectWallet] = useConnectWallet();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (currentAccount) {
      await registerCollection(
        currentAccount,
        data.collection_name,
        data.description,
        data.numberOfItems,
        data.mintFee
      );
    }
  };

  return (
    <div>
      <form className="w-full flex flex-col items-center">
        <div className="w-2/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Collection name
          </label>
          <input
            className="appearance-none block w-full text-gray-900 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            defaultValue=""
            {...register('collection_name')}
            id="collection_name"
            type="text"
          />
        </div>
        <div className="w-2/3 px-3">
          <label
            className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            defaultValue=""
            {...register('description')}
            className="appearance-none block w-full  text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="description"
          />
        </div>
        <div className="w-2/3 px-3">
          <label
            className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
            htmlFor="numberOfItems"
          >
            Number of items
          </label>
          <input
            defaultValue=""
            {...register('numberOfItems')}
            className="appearance-none block w-full text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="numberOfItems"
            type="number"
          />
        </div>
        <div className="w-2/3 px-3">
          <label
            className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
            htmlFor="mintFee"
          >
            Mint fee
          </label>
          <input
            defaultValue=""
            {...register('mintFee')}
            className="appearance-none block w-full  text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="mintFee"
            type="text"
          />
        </div>
        <div className="w-2/3 px-3">
          {currentAccount && (
            <Button onClick={handleSubmit(onSubmit)}>Apply</Button>
          )}
          {!currentAccount && (
            <Button onClick={connectWallet}>Connect wallet</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Apply;
