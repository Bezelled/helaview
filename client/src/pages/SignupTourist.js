import React from "react";
import { Container as ContainerBase } from "../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "../assets/img/signup-illustration.svg";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import Header, { NavLinks, NavLink, PrimaryLink } from "../components/headers/light.js";
import axios from 'axios';
import toast from 'react-hot-toast';
import { StyledDiv } from "../utils/AnimationRevealPage.js";
import { countryNames } from "../utils/shared";

const Container = tw(ContainerBase)`min-h-screen border-black text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl shadow-2xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`mt-6 lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`flex flex-col items-center`;
const MainHeading = tw.h1`text-2xl xl:text-3xl font-extrabold text-primary-500`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 mb-6 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Select = tw.select`w-full px-8 py-4 mb-6 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Option = tw.option`w-full px-8 py-4 mb-6 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Label = tw.label``;

const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-primary-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

const handleSubmit = async(event) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;

  if (!email)
    return toast.error('Please enter a valid e-mail address.');

  if (!password)
    return toast.error('Please enter a valid password.');

  try{
    const resp = await axios.post('http://127.0.0.1:7788/api/tourists/register', {
      'email': event.target.email.value,
      'first name': event.target['first name'].value,
      'last name': event.target['last name'].value,
      'password': event.target.password.value,
      'password confirmation': event.target['password confirmation'].value,
      'age': event.target.age.value,
      'gender': event.target.gender.value,
      'contact number': event.target['contact number'].value,
      'passport number': event.target['passport number'].value,
      'country': event.target.country.value
    });
    toast.success(resp.data.message);
  } catch (e){

    if (e.response?.data.error)
      return toast.error(e.response.data.error);
    
    toast.error('Uh oh! An error occurred.');
  };

}

export default ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign Up For HelaView",
  submitButtonText = "Sign Up",
  SubmitButtonIcon = SignUpIcon,
  tosUrl = "/tos",
  privacyPolicyUrl = "/privacy-policy",
  signInUrl = "/login"
}) => (
  <StyledDiv className="App">
    <Header links={[
      <NavLinks key={1}>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/contact-us" tw="lg:ml-12!">Contact Us</NavLink>
        <NavLink href="/login" tw="lg:ml-12!">Login</NavLink>
        <PrimaryLink css={false && tw`rounded-full`} href="/register">Sign Up</PrimaryLink>
      </NavLinks>
    ]} />
      <Container>
        <Content>
          <MainContainer>
            <MainContent>
              <MainHeading>TOURISTS</MainHeading>
              <Heading>{headingText}</Heading>

              <FormContainer>
                <Form onSubmit={handleSubmit}>
                  
                  <Label for="email">E-mail address:</Label>
                  <Input id="email" type="email" placeholder="hello@helaview.lk" required/>
                  <Label for="first name">First name:</Label>
                  <Input id="first name" type="text" placeholder="John" required/>
                  <Label for="last name">Last name:</Label>
                  <Input id="last name" type="text" placeholder="Doe" />
                  <Label for="password">Password (8-20 characters, with upper & lower case alphanumeric and special characters):</Label>
                  <Input id="password" type="password" placeholder="**********" required/>
                  <Label for="password confirmation">Retype password:</Label>
                  <Input id="password confirmation" type="password" placeholder="**********" required/>
                  <Label for="age">Age:</Label>
                  <Input id="age" type="number" placeholder="13" min="13" max="120" required/>
                  <Label for="gender">Gender:</Label>
                  <Select id="gender" name="gender" placeholder="Gender" required>
                      <Option selected value="M">Male</Option>
                      <Option value="F">Female</Option>
                  </Select>
                  <Label for="contact number">Contact number:</Label>
                  <Input id="contact number" type="tel" placeholder="+94771002030" required/>
                  <Label for="passport number">Passport number:</Label>
                  <Input id="passport number" type="text" placeholder="Passport number" />

                  <Label for="country">Country:</Label>
                  <Select id="country" name="country" placeholder="Country" required>
                    {countryNames.map(country => (
                      <Option value={country}>{country}</Option>
                    ))}
                  </Select>

                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                    By registering, You agree to abide by HelaView&#39;s{" "}
                    <a href={tosUrl} tw="border-b border-gray-500 border-dotted">
                      Terms of Service
                    </a>{" "}
                    and its{" "}
                    <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
                      Privacy Policy
                    </a>
                    .
                  </p>

                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                      Sign In
                    </a>
                  </p>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
  </StyledDiv>
);
