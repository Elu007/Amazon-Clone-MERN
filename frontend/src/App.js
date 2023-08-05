import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import styled from "styled-components";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';


const Container = styled.div`
  width: 100vw;
`;

function App() {
  const [basket, setBasket] = useState([]);
  console.log("basket >>>", basket);

  return (
    <Container>
      <Routes>
        <Route path='/' element={<Home basket={basket} setBasket={setBasket}/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
    </Container>
  );
}

export default App;
