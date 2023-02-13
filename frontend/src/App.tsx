import { Outlet } from 'react-router-dom';

import {
  Box,
  Flex,
} from '@mantine/core';

import HeroText from './components/hero/HeroText';
import NavButtons from './components/buttons/NavButtons';

const App = () => {
  return (
    <Flex justify="center" align="center" sx={{ minHeight: '100vh' }}>
      <Box m="xl">
        <HeroText hasMarginBottom={false}/>
        <NavButtons>
          <Outlet />
        </NavButtons>
      </Box>
    </Flex>
  )
}

export default App;