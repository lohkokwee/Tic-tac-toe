import {
  Box,
  Button,
  Container,
  Flex,
  LoadingOverlay,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { validateEmail } from '../schema/validations';

const HomePage = () => {
  const form = useForm({
    initialValues: {
      email: 'test',
    },
    validate: {
      email: (value) => validateEmail(value)
    }
  });

  const renderGameForm = () => {
    return (
      <Box>
        {/* <LoadingOverlay visible={} overlayBlur={1} /> */}
        <form onSubmit={form.onSubmit((values) => (console.log(values)))}>
          <Box mt="xs">
            <TextInput
              label="Enter opponent's email"
              {...form.getInputProps('email')}
            />
          </Box>
          <Box mt="xs">
            <Flex justify="center">
              <Button
                fullWidth
                type='submit'>
                START GAME
              </Button>
            </Flex>
          </Box >
        </form>
      </Box>
    );
  }

  return (
    <Flex justify="center">
      <Box m="xl">
        <Container>
          {renderGameForm()}
        </Container>
      </Box>
    </Flex >
  )
}

export default HomePage