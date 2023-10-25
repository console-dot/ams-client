import React, { useState, useEffect } from 'react';

export function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const options = { hour12: true, hour: '2-digit', minute: '2-digit' };

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <>{currentTime.toLocaleTimeString('en-US', options)}</>;
}
