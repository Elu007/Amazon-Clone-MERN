import React from 'react';
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';


const Container = styled.div`
  width: 100vw;
`;

function App() {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
    </Container>
  );
}

export default App;
