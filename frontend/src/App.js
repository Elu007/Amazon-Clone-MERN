import React from 'react';
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Checkout from './components/Checkout';
import Address from './components/Address'
import Payment from './components/Payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


const Container = styled.div`
  width: 100vw;
`;

const promise = loadStripe(
  'pk_test_51NeC2BSIt5ZXu8rJGhLLPkfC3HCy5CbKry8c8ozYP4NmfjI3bTCMqqLm4YuRqdhsiBJVmWM1UT9PqM0qG7Q8YWAz00ZH4T0ahw'
)

function App() {

  return (
    <Container>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/address' element={<Address/>} />
        <Route path='/payment' element={<Elements stripe={promise}>
          <Payment/>
        </Elements>} />
      </Routes>
    </Container>
  );
}

export default App;
