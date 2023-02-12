import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Container,
  Title,
  Text,
  Flex,
  TextInput,
  PasswordInput,
  Button,
  LoadingOverlay,
} from '@mantine/core';
import { showNotification } from "@mantine/notifications";
import { useForm } from '@mantine/form';

import useToggleState from '../hooks/useToggleState';
import { ENDPOINT } from '../constants';
import postData from '../services/postData';

export interface LogInValues {
  email: string,
  password: string
}

export interface SignUpValues extends LogInValues {
  confirmPassword: string
}

const LandingPage = () => {
  const navigate = useNavigate();
  const signingUp = useToggleState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email.'),
      password: (value) => (value !== undefined && value.length > 0 ? null : 'Invalid password.'),
      confirmPassword: (value, values) => {
        if (signingUp.isOpen) {
          return (value === values.password ? null : 'Passwords do not match.');
        }
        return null;
      }
    }
  });

  const renderHeroText = () => {
    return (
      <Box mb="xl">
        <Container mb={5} px={0}>
          <Title align='center' order={1}>TIC TAC TOE</Title>
        </Container>
        <Container px={0}>
          <Text align='center'>An accessibility focused board game.</Text>
        </Container>
      </Box>
    )
  }

  const renderLogInForm = () => {
    const toggleSignUp = (e: MouseEvent) => {
      e.preventDefault();
      signingUp.toggle()
      console.log(signingUp.isOpen)
    }

    const submitForm = (values: LogInValues) => {
      setIsSubmitting(true);
      const path = signingUp.isOpen ? '/register' : '/authenticate'
      postData(`${ENDPOINT}${path}`, {
        email: values.email,
        password: values.password
      })
        .then((response) => {
          setIsSubmitting(false);
          if (response.status === 200) {
            showNotification({
              color: "green",
              message: "Sucess!",
              autoClose: 3000,
            })
            navigate('/home')
          } else {
            showNotification({
              color: "red",
              message: `Unsuccessful! (Status ${response.status})`,
              autoClose: 3000,
            })
          }
        })
    }

    return (
      <Box>
        <LoadingOverlay visible={isSubmitting} overlayBlur={1} />
        <form onSubmit={form.onSubmit((values) => submitForm(values))}>
          <Box mt="xs">
            <TextInput
              label="Enter your email"
              {...form.getInputProps('email')}
            />
          </Box>
          <Box mt="xs">
            <PasswordInput
              label="Enter your password"
              {...form.getInputProps('password')}
            />
          </Box>
          {signingUp.isOpen && (
            <Box mt="xs">
              <PasswordInput
                label="Confirm your password"
                {...form.getInputProps('confirmPassword')}
              />
            </Box>
          )}
          <Box pt="md">
            <Flex mt="xl" justify="space-between">
              <Button
                radius="xl"
                onClick={(e) => toggleSignUp(e)}
                variant="subtle">{signingUp.isOpen ? 'Log In' : 'Sign Up'}</Button>
              <Button
                radius="xl"
                type='submit'>{signingUp.isOpen ? 'Sign Up' : 'Log In'}
              </Button>
            </Flex>
          </Box >
        </form>
      </Box>
    )
  }

  return (
    <Flex justify="center" align="center" sx={{ minHeight: '100vh' }}>
      <Box m="xl">
        <Container>
          {renderHeroText()}
          {renderLogInForm()}
        </Container>
      </Box>
    </Flex>
  )
}

export default LandingPage