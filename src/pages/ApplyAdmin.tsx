import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../components/NormalButton';
import { useConnectWallet } from '../hooks/useConnectWallet';
import {
  approve_collection,
  bindAssetToNft,
  registerCollection,
} from '../utils/pallet-interact/extrinsic_call';
import { useParams } from 'react-router-dom';

type Inputs = {
  startDate: string;
  endDate: string;
};

const ApplyAdmin = () => {
  const [currentAccount, connectWallet] = useConnectWallet();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { collectionId } = useParams();

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(startDate);
    if (currentAccount && collectionId) {
      await approve_collection(
        currentAccount,
        collectionId,
        Math.floor(startDate.getTime() / 1000),
        Math.floor(endDate.getTime() / 1000)
      );

      // setTimeout(async () => {
      //   await bindAssetToNft(currentAccount, collectionId);
      // }, 3000);
    }
  };

  function onChange(value: any, dateString: any) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  return (
    <div>
      <form className="w-full flex flex-col items-center">
        <div className="w-2/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Start time
          </label>
          <DatePicker
            showTime={true}
            onChange={(e: any, dateString: string) => {
              setStartDate(new Date(dateString));
            }}
          />
        </div>
        <br />
        <div className="w-2/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            End time
          </label>
          <DatePicker
            showTime={true}
            onChange={(e: any, dateString: string) => {
              setEndDate(new Date(dateString));
            }}
          />
        </div>
        <br />
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

export default ApplyAdmin;
