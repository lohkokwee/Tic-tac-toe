import { useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import {
  Box,
  Flex,
} from '@mantine/core';

import { User } from './types';
import HeroText from './components/hero/HeroText';
import NavButtons from './components/buttons/NavButtons';
import getData from './services/baseServices/getData';
import { SocketContext } from './context/socket';
import { ENDPOINT } from './constants';

const App = () => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const connect = (user: User) => {
    socket.emit('indicate_online', user)
    return () => {
      socket.off('indicate_online', user)
      socket.emit('indicate_offline', user)
    }
  }

  useEffect(() => {
    try {
      getData(`${ENDPOINT}/authenticate/@me`)
        .then((response) => {
          if (response.status !== 200) {
            navigate('/')
          }
          return (response.json())
        })
        .then((data) => {
          console.log('data', data);
          connect(data[0]?.user);
        });
    } catch (error) {
      navigate('/')
    }
  }, [])


  return (
    <Flex justify="center" align="center" sx={{ minHeight: '100vh' }}>
      <Box m="xl">
        <HeroText hasMarginBottom={false} subtitle />
        <NavButtons>
          <Outlet />
        </NavButtons>
      </Box>
    </Flex>
  )
}

export default App;