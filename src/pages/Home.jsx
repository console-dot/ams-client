import { Button } from 'flowbite-react';
import { CommonLayout } from '../layouts';
import { Clock, QRReader } from '../components';
import AttendanceTable from '../components/AttendanceTable';
import { useEffect, useState } from 'react';
import { getAttendance } from '../api';

export const Home = () => {
  const [qr, setQr] = useState(false);
  const [data, setData] = useState([]);
  const updateAttendance = async () => {
    const res = await getAttendance();
    if (res?.status !== 200) {
      console.log(res?.message);
      return;
    }
    setData(res?.data);
  };
  useEffect(() => {
    updateAttendance();
  }, []);
  return (
    <CommonLayout>
      <div className='flex items-center justify-between p-5 bg-gray-50'>
        <span className='font-semibold text-xl'>
          <Clock />
        </span>
        <Button onClick={() => setQr(true)} className='btn'>
          Mark Attendance
        </Button>
      </div>
      <AttendanceTable data={data} />
      {qr && (
        <div className='absolute w-full top-0 bg-[rgba(0,0,0,0.6)] h-screen z-50'>
          <Button onClick={() => setQr(false)} className='fixed top-3 right-3'>
            X
          </Button>
          <QRReader updateAttendance={updateAttendance} setQr={setQr} />
        </div>
      )}
    </CommonLayout>
  );
};
