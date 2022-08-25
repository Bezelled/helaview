import React from 'react';
import InfoCard from '../components/cards/InfoCard';
import PageTitle from '../components/typography/PageTitle';
import tw from "twin.macro";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

export default function Profile(){

  return (
    <>
      <PageTitle>User Profile</PageTitle>
      < InfoCard />
      <Container>
        <TwoColumn>
          <LeftColumn>
            Left
          </LeftColumn>
          <RightColumn>
            Right
          </RightColumn>
        </TwoColumn>
      </Container>
    </>
  )
}