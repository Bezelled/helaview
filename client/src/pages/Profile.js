import React, { useState, useEffect } from 'react';
import InfoCard from '../components/cards/InfoCard';
import PageTitle from '../components/typography/PageTitle';
import tw from "twin.macro";
import response from '../utils/demo/tableData';
import Sidebar from '../components/sidebars';

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

export default function Profile(){
  const [pageTable, setPage] = useState(1);
  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable(response.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
  }, [pageTable]);

  return (
    <>
      <PageTitle>User Profile</PageTitle>
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Sidebar />
          </LeftColumn>
          <RightColumn>
            Right
          </RightColumn>
        </TwoColumn>
      </Container>
    </>
  )
}