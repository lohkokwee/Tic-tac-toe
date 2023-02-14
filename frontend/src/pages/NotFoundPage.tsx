import {
  Box,
  Container,
  Flex,
  Title,
  Text,
  Button
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../constants';
import getData from '../services/baseServices/getData';
import { User } from '../types';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      getData(`${ENDPOINT}/@me`)
      .then((response) => (response.json()))
      .then((data) => {setUser(data?.user)})
    } catch (error) {}
  }, [])

  const renderContent = () => {
    return (
      <Box mb="xl">
        <Container mb={5} px={0}>
          <Title align='center' order={1}>TIC TAC TOE</Title>
        </Container>
        <Container px={0}>
          <Text mt="sm" align='center'>This page is currently unavailable.</Text>
          <Text mt="sm" align='center'>Please click the button below to go back to the main page.</Text>
        </Container>
        <Flex mt="xl" justify="center">
          <Button
            radius="xl"
            onClick={() => {
              navigate(user ? '/home' : '/')
            }} 
          >
            BACK TO MAIN
          </Button>
        </Flex>
      </Box>
    )
  }

  return (
    <Flex justify="center" align="center" sx={{ minHeight: '100vh' }}>
      <Box m="xl">
        <Container>
          {renderContent()}
        </Container>
      </Box>
    </Flex>
  )
}

export default NotFoundPage