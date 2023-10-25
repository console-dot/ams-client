import { Button } from 'flowbite-react';
import { CommonLayout } from '../layouts';
import { Clock, QRReader } from '../components';
import AttendanceTable from '../components/AttendanceTable';
import { useEffect, useState } from 'react';
import { filterAttendance, getAttendance } from '../api';
import { formatDateAsApi } from '../utils';

export const Home = () => {
  const [qr, setQr] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState(false);
  const updateAttendance = async () => {
    try {
      setLoading(true);
      const res = await getAttendance();
      if (res?.status !== 200) {
        console.log(res?.message);
        setLoading(false);
        return;
      }
      setData(res?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const searchAttendance = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const res = await filterAttendance(
        formatDateAsApi(formData.get('start')),
        formatDateAsApi(formData.get('end'))
      );
      if (res?.status >= 200 && res?.status < 300) {
        setData(res?.data);
        setFiltered(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!filtered && localStorage.getItem('@user')) updateAttendance();
  }, [filtered]);
  return (
    <CommonLayout>
      <div className='flex items-center justify-between p-5 bg-gray-50'>
        <span className='font-semibold text-xl'>
          <Clock />
        </span>
        <Button disabled={loading} onClick={() => setQr(true)} className='btn'>
          Mark Attendance
        </Button>
      </div>
      <AttendanceTable
        loading={loading}
        filtered={filtered}
        setFiltered={setFiltered}
        searchAttendance={searchAttendance}
        data={data}
      />
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
