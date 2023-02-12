import {
  Box,
  Container,
  Flex,
  Title,
  Text,
  Button
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

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
              navigate('/')
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