import { web3FromSource } from '@polkadot/extension-dapp';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../../utils/functions';
import { Button } from '../../components/NormalButton';
import { useConnectWallet } from '../../hooks/useConnectWallet';
import { createProposal } from '../../utils/pallet-interact/extrinsic_call';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { DatePicker } from 'antd';

type Inputs = {
  title: string;
  description: string;
  withdrawAmount: number;
  withdrawAddress: string;
  expiredAt: string;
};

const ProposalCreate = () => {
  const [currentAccount, connectWallet] = useConnectWallet();
  const { collectionId } = useParams();
  const [expiredAt, setExpiredAt] = useState(new Date());

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (currentAccount && collectionId) {
      createProposal(
        currentAccount,
        collectionId,
        data.title,
        data.description,
        data.withdrawAmount,
        data.withdrawAddress,
        Math.floor(expiredAt.getTime() / 1000)
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
            Proposal title
          </label>
          <input
            className="appearance-none block w-full text-gray-900 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            defaultValue=""
            {...register('title')}
            id="title"
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
            Withdraw (%)
          </label>
          <input
            defaultValue=""
            {...register('withdrawAmount')}
            className="appearance-none block w-full text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="withdrawAmount"
            type="number"
          />
        </div>
        <div className="w-2/3 px-3">
          <label
            className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
            htmlFor="withdrawAddress"
          >
            Withdraw to address
          </label>
          <input
            defaultValue=""
            {...register('withdrawAddress')}
            className="appearance-none block w-full  text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="withdrawAddress"
            type="text"
          />
          <DatePicker
            showTime={true}
            onChange={(e: any, dateString: string) => {
              setExpiredAt(new Date(dateString));
            }}
          />
        </div>
        <br />
        <div className="w-2/3 px-3">
          {currentAccount && (
            <Button onClick={handleSubmit(onSubmit)}>Create proposal</Button>
          )}
          {!currentAccount && (
            <Button onClick={connectWallet}>Connect wallet</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProposalCreate;
