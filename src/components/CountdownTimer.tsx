import React from 'react';
import { useCountdown } from '../hooks/useCountDown';

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const DateTimeDisplay: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="flex mr-1 bg-cyan-300 w-8 h-8 text-center justify-center align-middle text-black font-bold rounded">
      {value}
    </div>
  );
};

export const CountdownTimer: React.FC<{
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}> = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="flex my-2">
      <DateTimeDisplay value={days} />
      <DateTimeDisplay value={hours} />
      <DateTimeDisplay value={minutes} />
      <DateTimeDisplay value={seconds} />
    </div>
  );
};
