import React from "react";
import { useHistory } from 'react-router-dom';
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import axios from 'axios';
import toast from 'react-hot-toast';
import illustration from "../assets/img/signup-illustration.svg";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import Header, { NavLinks, NavLink, PrimaryLink } from "../components/headers/light.js";
import { StyledDiv } from "../utils/AnimationRevealPage.js";
import { districts } from "../utils/shared";

const MainHeading = tw.h1`mx-auto max-w-xs text-center text-2xl xl:text-3xl font-extrabold text-primary-500`;
const Heading = tw.h1`mx-auto max-w-xs text-2xl mb-4 text-center xl:text-3xl font-extrabold`;
const SubHeading = tw.h2`text-2xl xl:text-3xl font-extrabold text-primary-400 mb-4`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`bg-gray-100 p-12 rounded-2xl mx-auto max-w-xl mb-4`;
const Input = tw.input`w-full appearance-none px-8 py-4 mb-6 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-primary-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const TextArea = tw.textarea`w-full appearance-none px-8 py-4 mb-6 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-primary-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Select = tw.select`w-full px-8 py-4 mb-6 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-primary-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Option = tw.option`w-full px-8 py-4 mb-6 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-primary-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Label = tw.label`mt-4`;

const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustratedContainer = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`max-w-screen-xl shadow-2xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 sm:rounded-lg flex justify-center flex-1 bg-center bg-cover bg-no-repeat`}
`;
let images;

const SignUpPage =({
  headingText = "Sign Up For HelaView",
  submitButtonText = "Sign Up",
  SubmitButtonIcon = SignUpIcon,
  tosUrl = "/tos",
  privacyPolicyUrl = "/privacy-policy",
  signInUrl = "/login"
}) => {

  const history = useHistory();
  const fileSelectedHandler = (event) =>{
    images = event.target.files;
  }

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

      const formData = new FormData();
      
      formData.append('email', event.target.email.value);
      formData.append('full name', event.target['full name'].value);
      formData.append('contact number', event.target['contact number'].value);
      formData.append('password', event.target.password.value);
      formData.append('password confirmation', event.target['password confirmation'].value);
      formData.append('address', event.target.address.value);
      formData.append('district',event.target.district.value);
      formData.append('adult price',event.target['adult price'].value);
      formData.append('child price',event.target['child price'].value);
      formData.append('baby price',event.target['baby price'].value);
      formData.append('description', event.target.description.value);
      formData.append('images', images);
      formData.append('room count', event.target['room count'].value);
      formData.append('rating', event.target.rating.value);
      formData.append('hotel type', event.target['hotel type'].value);
      
      const resp = await axios.post(
        'http://127.0.0.1:7788/api/hotels/register',
        formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        });

      toast.success(resp.data.message);
      setTimeout( () => {
        history.push("/login");
      }, 5000);
    } catch (e){
  
      if (e.response?.data?.error)
        return toast.error(e.response.data.error);
      
      toast.error('Uh oh! An error occurred.');
    };
  
  }
  return(
    <StyledDiv className="App">
      <Header links={[
        <NavLinks key={1}>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact-us" tw="lg:ml-12!">Contact Us</NavLink>
          <PrimaryLink css={tw`lg:ml-12!`} href="/login">Login</PrimaryLink>
        </NavLinks>
      ]}/>
      <IllustratedContainer imageSrc={illustration}>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
        <MainHeading>HOTELS</MainHeading>
        <Heading>{headingText}</Heading>
        <SubHeading>Contact Information</SubHeading>
          
          <Label for="email">E-mail address:
          <Input id="email" type="email" placeholder="hello@helaview.lk" required/>
          </Label>
          
          <Label for="full name">Full name:
          <Input id="full name" type="text" placeholder="HelaView Hotel" required/>
          </Label>
  
          <Label for="contact number">Contact number:
          <Input id="contact number" type="tel" placeholder="+94771002030" required/>
          </Label>
  
          <Label for="address">Address:
          <TextArea id="address" placeholder="Residential Number, Street Lane, Street Address, City." />
          </Label>
  
          <Label for="district">District:
          <Select id="district" name="district" placeholder="District" required>
            {districts.map(district => (
              <Option value={district}>{district}</Option>
            ))}
          </Select>
          </Label>
  
          <Label for="password">Password (8-20 characters, with upper & lower case alphanumeric and special characters):
          <Input id="password" type="password" placeholder="**********" required/>
          </Label>
  
          <Label for="password confirmation">Retype password:
          <Input id="password confirmation" type="password" placeholder="**********" required/>
          </Label>
  
          <SubHeading>Prices per night (in US$)</SubHeading>
          
          <Label for="adult price">Nightly USD price per adult:
          <Input id="adult price" type="number" placeholder="5" min="1" max="5000" required/>
          </Label>
  
          <Label for="child price">Nightly USD price per child:
          <Input id="child price" type="number" placeholder="5" min="1" max="5000" required/>
          </Label>
  
          <Label for="baby price">Nightly USD price per baby:
          <Input id="baby price" type="number" placeholder="5" min="1" max="5000" required/>
          </Label>
          <SubHeading>Miscellaneous</SubHeading>

          <Label for="description">Description:
          <TextArea id="description" placeholder="Please write a short description about the hotel (<150 characters)." required/>
          </Label>
            
          <Label for="images">Images (please upload a few images of your hotel):
          <Input id="images" type="file" accept="image/png, image/jpeg" multiple onChange={fileSelectedHandler} required/>
          </Label>
          
          <Label for="room count">Available room count (HelaView will only allow this number of rooms to be booked at any given time):
          <Input id="room count" type="number" placeholder="5" min="1" max="5000" required/>
          </Label>
          <Label for="rating">Rating (if you are unrated, select 0.00, else, start from 1.00):
          <Input id="rating" type="number" step="0.25" placeholder="4.50" min="0.00" max="5.00" required/>
          </Label>
  
          <Label for="hotel type">Hotel Type:
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
          </Label>
          
          <SubmitButton>
            <span className="text">Pay with PayPal</span>
          </SubmitButton>
  
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
      </IllustratedContainer>
    </StyledDiv>
  );
}

export default SignUpPage;