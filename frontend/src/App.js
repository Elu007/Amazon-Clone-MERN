import React from 'react';
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Checkout from './components/Checkout';
import Address from './components/Address'


const Container = styled.div`
  width: 100vw;
`;

function App() {

  return (
    <Container>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/address' element={<Address/>} />
      </Routes>
    </Container>
  );
}

export default App;
