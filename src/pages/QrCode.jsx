import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { BASE_URL } from '../api/config';

export const QrCode = () => {
  const [val, setVal] = useState('');
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        fetch(BASE_URL + '/qr')
          .then((res) => res.json())
          .then((res) => setVal(res?.key));
      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error(error);
      }
    };
    fetchData();

    // Set up an interval to fetch data every 3 seconds
    const intervalId = setInterval(fetchData, 3000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <QRCode
        title='GeeksForGeeks'
        value={val}
        bgColor={'#ffffff'}
        fgColor={'#000000'}
        size={256}
      />
    </div>
  );
};
