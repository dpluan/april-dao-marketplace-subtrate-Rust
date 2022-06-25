import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { CountdownTimer } from './CountdownTimer';

const MintTime: React.FC<{ time: string }> = ({ time }) => {
  const [days, hours, minutes, seconds] = useCountdown(time);

  return days + hours + minutes + seconds > 0 ? (
    <CountdownTimer
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  ) : (
    <></>
  );
};

export default MintTime;
