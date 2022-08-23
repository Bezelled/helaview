import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import LogoImage from "assets/img/logo-light.svg";
import { ReactComponent as FacebookIcon } from "assets/img/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "assets/img/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "assets/img/youtube-icon.svg";

const Container = tw.div`relative bg-gray-900 text-gray-100 -mx-8 -mb-8 px-8`;
const Content = tw.div`max-w-screen-xl mx-auto pt-16 pb-8`
const FiveColumns = tw.div`flex flex-wrap justify-between`;
const Column = tw.div`w-1/2 md:w-1/5 mb-8 md:mb-0 text-sm sm:text-base text-center md:text-left`;
const CompanyColumn = tw.div`text-center md:text-left mb-16 lg:mb-0 w-full lg:w-1/5`;
const ColumnHeading = tw.h5`font-bold uppercase`;
const LinkList = tw.ul`mt-4 text-sm font-medium`;
const LinkListItem = tw.li`mt-3`;
const Link = tw.a`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-100 pb-1 transition duration-300`;
const LogoImg = tw.img`w-8`;
const CompanyAddress = tw.p`mt-4 max-w-xs font-medium text-sm mx-auto lg:mx-0 lg:mr-4 leading-loose text-center lg:text-left`;
const SocialLinksContainer = tw.div`mt-4 text-center lg:text-left`;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-500 transition duration-300 mr-4 last:mr-0`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

const CopyrightAndCompanyInfoRow = tw.div`pb-0 text-sm font-normal flex flex-col sm:flex-row justify-between items-center`
const CopyrightNotice = tw.div``
const CompanyInfo = tw.div``

const Divider = tw.div`my-8 border-b-2 border-gray-800`
export default () => {
  return (
    <Container>
      <Content>
        <FiveColumns>
          <CompanyColumn>
          <LogoImg src={LogoImage} />
            <CompanyAddress>
              123 Road, New Startup Building
              Carter Road, San Francisco
              California 40234
            </CompanyAddress>
            <SocialLinksContainer>
              <SocialLink href="https://facebook.com">
                <FacebookIcon />
              </SocialLink>
              <SocialLink href="https://twitter.com">
                <TwitterIcon />
              </SocialLink>
              <SocialLink href="https://youtube.com">
                <YoutubeIcon />
              </SocialLink>
            </SocialLinksContainer>
          </CompanyColumn>
          <Column>
            <ColumnHeading>Quick Links</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link href="#">Blog</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="/faq">FAQs</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="/contact-us">Support</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="/about">About Us</Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>Product</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link href="/login">Log In</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Personal</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Business</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Team</Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>Legal</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="/tos">Terms of Service</Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>Contact</ColumnHeading>
            <LinkList>
              <LinkListItem>
                (+94) 117 675 100
              </LinkListItem>
              <LinkListItem>
                <Link href="mailto:support@helaview.lk">support@helaview.lk</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Sales</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Report Abuse</Link>
              </LinkListItem>
            </LinkList>
          </Column>
        </FiveColumns>
        <Divider/>
        <CopyrightAndCompanyInfoRow>
          <CopyrightNotice>&copy; Copyright 2022, HelaView</CopyrightNotice>
          <CompanyInfo>An Internet Company.</CompanyInfo>
        </CopyrightAndCompanyInfoRow>
      </Content>
    </Container>
  );
};
