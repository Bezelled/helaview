import React, { useState, useEffect } from 'react';
import InfoCard from '../components/cards/InfoCard';
import ChartCard from '../components/charts/ChartCard';
import { Doughnut, Line } from 'react-chartjs-2';
import ChartLegend from '../components/charts/ChartLegend';
import PageTitle from '../components/typography/PageTitle';
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, EditIcon, TrashIcon } from '../assets/icons';
import RoundIcon from '../components/RoundIcon';
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Button,
  Pagination,
} from '@windmill/react-ui';
import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData';
import axios from 'axios';

export default function Dashboard(){
  const [pageTable, setPage] = useState(1);
  const [dataTable, setDataTable] = useState([]);
  const [totalResults, setTotalResults] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
      let isSubscribed = true;
      const fetchData = async () => {
        const resp = await axios.get(`http://localhost:7788/api/hotels/profiles/${pageTable}`);
        
        if (isSubscribed)
          setDataTable(resp.data.profiles);
      };
      fetchData()
        .catch(console.error);
      return () => isSubscribed = false;
    }, [pageTable]);

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total hotels" value="6389">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total revenue" value="$ 46,760.89">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="New accounts" value="376">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending email verification" value="35">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Hotel</TableCell>
              <TableCell>Contact No</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((hotel, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={hotel.avatar} alt="AV" /> */}
                    <div>
                      <p className="font-semibold">{hotel.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{hotel["hotel type"]}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <a className="text-sm" href={`tel:${hotel["contact no"]}`}>{`+${hotel["contact no"]}`}</a>
                </TableCell>
                <TableCell>
                  <span className="text-sm items-center">{hotel.rating}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{hotel.email}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
    </>
  )
}