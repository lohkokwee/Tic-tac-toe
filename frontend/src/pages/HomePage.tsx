import {
  Box,
  Container,
  Flex,
  Text,
} from '@mantine/core';

const HomePage = () => {
  return (
    <Flex justify="center" align="center" sx={{ minHeight: '100vh' }}>
      <Box m="xl">
        <Container>
          <Text>Home Page</Text>
        </Container>
      </Box>
    </Flex>
  )
}

export default HomePage