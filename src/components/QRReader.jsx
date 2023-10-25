import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { getId } from '../utils';
import { markAttendance } from '../api';
import { useToastState } from '../context';

export const QRReader = ({ setQr, updateAttendance }) => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const { dispatch } = useToastState();

  const handleScan = async (employeeId, key) => {
    try {
      const res = await markAttendance(employeeId, key);
      if (res?.status === 201 || res?.status === 200) {
        dispatch({ type: 'SUCCESS', payload: res?.message });
        await updateAttendance();
        setQr(false);
      } else {
        dispatch({ type: 'ERROR', payload: res?.message });
        setQr(false);
      }
    } catch (error) {
      console.error(error);
      setErr(err);
    }
  };

  useEffect(() => {
    if (data) {
      const employeeId = getId();
      const key = data;

      const handleScanAndCleanup = async () => {
        await handleScan(employeeId, key);
      };

      handleScanAndCleanup();
    }
    return () => {
      // Cleanup function to cancel any pending asynchronous tasks
      // when the component unmounts.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, updateAttendance]);

  const handleResult = (result, error) => {
    try {
      if (result) {
        setErr(result);
        setData(result.text);
      }

      if (error) {
        console.error(error);
      }
    } catch (err) {
      setErr(err);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <QrReader
        className='p-8 w-full rounded-lg'
        scanDelay={50}
        onResult={handleResult}
        constraints={{ facingMode: 'environment' }}
      />
    </div>
  );
};
