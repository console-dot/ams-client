import { Button, Datepicker, Spinner, Table } from 'flowbite-react';
import { getDate, getDay, getTime } from '../utils';

export default function AttendanceTable({
  loading,
  setFiltered,
  filtered,
  searchAttendance,
  data,
}) {
  return (
    <>
      <form onSubmit={searchAttendance}>
        <div className='p-5 flex flex-col gap-3'>
          <Datepicker
            disabled={loading}
            name='start'
            title='Start Date'
            required
          />
          <Datepicker disabled={loading} name='end' title='End Date' required />
          <Button
            disabled={loading}
            type='submit'
            className='flex items-center justify-center'
          >
            {loading && <Spinner aria-label='Filter Attendance' size='sm' />}
            <span className={loading ? 'pl-3' : null}>Search</span>
          </Button>
          {filtered && (
            <Button
              disabled={loading}
              onClick={() => setFiltered(false)}
              color='gray'
            >
              Clear Filter
            </Button>
          )}
        </div>
      </form>
      {loading ? (
        <div className='flex items-center justify-center p-5'>
          <Spinner aria-label='Extra large spinner example' size='xl' />
        </div>
      ) : (
        <div
          className={
            'overflow-hidden overflow-y-scroll p-5 ' + filtered
              ? 'h-[calc(100vh-244px-82px-60px)]'
              : 'h-[calc(100vh-190px-82px-60px)]'
          }
        >
          <div className='relative overflow-x-auto px-5'>
            <Table className='mb-3'>
              <Table.Head>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Day</Table.HeadCell>
                <Table.HeadCell>Check-In</Table.HeadCell>
                <Table.HeadCell>Check-Out</Table.HeadCell>
                <Table.HeadCell className='text-center'>Status</Table.HeadCell>
              </Table.Head>
              <Table.Body className='divide-y'>
                {data.map((item, index) => (
                  <Table.Row
                    key={index}
                    className='bg-white dark:border-gray-700 dark:bg-gray-800'
                  >
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                      {getDate(item?.checkin)}
                    </Table.Cell>
                    <Table.Cell>{getDay(item?.checkin)}</Table.Cell>
                    <Table.Cell>{getTime(item?.checkin)}</Table.Cell>
                    <Table.Cell>
                      {item?.checkout ? getTime(item?.checkout) : '-'}
                    </Table.Cell>
                    <Table.Cell className='text-center'>
                      {item?.status === 'half'
                        ? 'Half Day'.toUpperCase()
                        : item?.status === 'full'
                        ? 'Full Day'.toUpperCase()
                        : '-'}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}
