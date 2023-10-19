import { Button, Datepicker, Table } from 'flowbite-react';
import { getDate, getDay, getTime } from '../utils';

export default function AttendanceTable({ data }) {
  return (
    <>
      <div className='p-5 flex flex-col gap-3'>
        <Datepicker title='Start Date' />
        <Datepicker title='End Date' />
        <Button>Search</Button>
      </div>
      <div className='overflow-hidden overflow-y-scroll p-5 h-[calc(100vh-190px-82px-60px)]'>
        <div className='relative overflow-x-auto'>
          <Table className='mb-3'>
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Day</Table.HeadCell>
              <Table.HeadCell>Check-In</Table.HeadCell>
              <Table.HeadCell>Check-Out</Table.HeadCell>
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
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}
