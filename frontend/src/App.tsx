import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import {
  Box,
  Flex,
} from '@mantine/core';

import { User } from './types';
import HeroText from './components/hero/HeroText';
import NavButtons from './components/buttons/NavButtons';
import getData from './services/baseServices/getData';
import { ENDPOINT } from './constants';

const App = () => {
  const navigate = useNavigate();
  
  const connect = (user: User) => {
    const socket = io(`${ENDPOINT}`, {});
    socket.on('connect', () => {
      socket.emit('indicate_online', {user})
    })
  }

  useEffect(() => {
    try {
      getData(`${ENDPOINT}/@me`)
      .then((response) => {
        if (response.status !==  200) {
          navigate('/')
        }
        return(response.json())
      })
      .then((data) => {
        console.log('data', data);
        connect(data?.user);
      });
    } catch (error) {
      navigate('/')
    }
  }, [])


  return (
    <Flex justify="center" align="center" sx={{ minHeight: '100vh' }}>
      <Box m="xl">
        <HeroText hasMarginBottom={false} subtitle/>
        <NavButtons>
          <Outlet />
        </NavButtons>
      </Box>
    </Flex>
  )
}

export default App;