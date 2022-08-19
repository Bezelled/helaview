import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "../assets/img/signup-illustration.svg";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import Header, { NavLinks, NavLink, PrimaryLink } from "../components/headers/light.js";
import { StyledDiv } from "../utils/AnimationRevealPage.js";
import axios from 'axios';
import toast from 'react-hot-toast';

const MainHeading = tw.h1`mx-auto max-w-xs text-center text-2xl xl:text-3xl font-extrabold text-primary-500`;
const Heading = tw.h1`mx-auto max-w-xs text-2xl mb-4 text-center xl:text-3xl font-extrabold`;
const SubHeading = tw.h2`text-2xl xl:text-3xl font-extrabold text-primary-400`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`bg-gray-100 p-12 rounded-2xl mx-auto max-w-xl mb-4`;
const Input = tw.input`w-full appearance-none px-8 py-4 mb-6 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-primary-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const TextArea = tw.textarea`w-full appearance-none px-8 py-4 mb-6 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-primary-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Select = tw.select`w-full px-8 py-4 mb-6 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-primary-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Option = tw.option`w-full px-8 py-4 mb-6 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-primary-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
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
const IllustratedContent = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`max-w-screen-xl shadow-2xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 sm:rounded-lg flex justify-center flex-1 bg-center bg-cover bg-no-repeat`}
`;
const districts = ["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Hambantota", "Matara", "Kurunegala", "Puttalam", "Batticaloa", "Trincomalee", "Ampara", "Ratnapura", "Kegalle", "Anuradhapura", "Polonnaruwa", "Jaffna", "Mullaitivu", "Vavuniya", "Kilinochchi", "Mannar", "Badulla", "Monaragala"];

const handleSubmit = async(event) => {
  event.preventDefault();
  
  const email = event.target.email.value;
  const password = event.target.password.value;

  if (event.target.password.value !== event.target['password confirmation'].value)
    return toast.error('Passwords do not match.');

  if (!email)
    return toast.error('Please enter a valid e-mail address.');

  if (!password)
    return toast.error('Please enter a valid password.');

  try{
    const resp = await axios.post('http://127.0.0.1:7788/api/hotels/register', {
      'email': event.target.email.value,
      'full name': event.target['full name'].value,
      'contact number': event.target['contact number'].value,
      'password': event.target.password.value,
      'password confirmation': event.target['password confirmation'].value,
      'address': event.target.address.value,
      'district':event.target.district.value,
      'adult price':event.target['adult price'].value,
      'child price':event.target['child price'].value,
      'baby price':event.target['baby price'].value,
      'room count': event.target['room count'].value,
      'rating': event.target.rating.value,
      'hotel type': event.target['hotel type'].value
    });
    toast.success(resp.data.message);
  } catch (e){

    if (e.response?.data.error)
      return toast.error(e.response.data.error);
    
    toast.error('Uh oh! An error occurred.');
  };

}
export default ({
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
        <PrimaryLink css={tw`lg:ml-12!`} href="/register">Login</PrimaryLink>
      </NavLinks>
    ]}/>
    <IllustratedContent imageSrc={illustration}>
    <FormContainer>
      <Form onSubmit={handleSubmit}>
      <MainHeading>HOTELS</MainHeading>
      <Heading>{headingText}</Heading>
      <SubHeading>Contact Information</SubHeading>
        
        <Label for="email">E-mail address:</Label>
        <Input id="email" type="email" placeholder="hello@helaview.lk" required/>
        
        <Label for="full name">Full name:</Label>
        <Input id="full name" type="text" placeholder="HelaView Hotel" required/>

        <Label for="contact number">Contact number:</Label>
        <Input id="contact number" type="tel" placeholder="+94771002030" required/>
        
        <Label for="address">Address:</Label>
        <TextArea id="address" placeholder="Residential Number, Street Lane, Street Address, City." />

        <Label for="district">District:</Label>
        <Select id="district" name="district" placeholder="District" required>
          {districts.map(district => (
            <Option value={district}>{district}</Option>
          ))}
        </Select>
        
        <Label for="password">Password (8-20 characters, with upper & lower case alphanumeric and special characters):</Label>
        <Input id="password" type="password" placeholder="**********" required/>
        <Label for="password confirmation">Retype password:</Label>
        <Input id="password confirmation" type="password" placeholder="**********" required/>
        
        <SubHeading>Prices per night (in US$)</SubHeading>
        
        <Label for="adult price">Nightly USD price per adult:</Label>
        <Input id="adult price" type="number" placeholder="5" min="1" max="5000" required/>

        <Label for="child price">Nightly USD price per child:</Label>
        <Input id="child price" type="number" placeholder="5" min="1" max="5000" required/>

        <Label for="baby price">Nightly USD price per baby:</Label>
        <Input id="baby price" type="number" placeholder="5" min="1" max="5000" required/>

        <SubHeading>Miscellaneous</SubHeading>
        
        <Label for="room count">Available room count (HelaView will only allow this number of rooms to be booked at any given time):</Label>
        <Input id="room count" type="number" placeholder="5" min="1" max="5000" required/>

        <Label for="rating">Rating (if you are unrated, select 0.00, else, start from 1.00):</Label>
        <Input id="rating" type="number" step="0.25" placeholder="4.50" min="0.00" max="5.00" required/>
        
        <Label for="hotel type">Hotel Type:</Label>
        <Select id="hotel type" name="hotel type" placeholder="Hotel Type">
            <Option value="Villa">Villa</Option>
            <Option value="Resort">Resort</Option>
            <Option value="Chain hotel">Chain hotel</Option>
            <Option value="Inn">Inn</Option>
            <Option value="Conference hotel">Conference hotel</Option>
            <Option value="Extended stay hotel">Extended stay hotel</Option>
            <Option value="Boutique">Boutique</Option>
            <Option value="Bungalow">Bungalow</Option>
            <Option value="Bed and Breakfast">Bed and Breakfast</Option>
            <Option value="Heritage hotel">Heritage hotel</Option>
            <Option value="Motel">Motel</Option>
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
    </IllustratedContent>
  </StyledDiv>
);
