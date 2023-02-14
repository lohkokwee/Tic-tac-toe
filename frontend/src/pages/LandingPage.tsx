import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Container,
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
import postData from '../services/baseServices/postData';
import HeroText from '../components/hero/HeroText';
import { validateEmail, validatePassowrd } from '../schema/validations';

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
      email: (value) => validateEmail(value),
      password: (value) => validatePassowrd(value),
      confirmPassword: (value, values) => {
        if (signingUp.isOpen) {
          return (value === values.password ? null : 'Passwords do not match.');
        }
        return null;
      }
    }
  });

  const renderLogInForm = () => {
    const toggleSignUp = (e: MouseEvent) => {
      e.preventDefault();
      signingUp.toggle()
    }

    const submitForm = (values: LogInValues) => {
      setIsSubmitting(true);
      const path = signingUp.isOpen ? '/register/' : '/authenticate/'
      try {
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
              signingUp.isOpen ? signingUp.toggle() : navigate('/home')
            } else {
              showNotification({
                color: "red",
                message: `Unsuccessful! (Status ${response.status})`,
                autoClose: 3000,
              })
            }
          })
      } catch (error) {
        console.log('received')
        setIsSubmitting(false);
        showNotification({
          color: "red",
          message: `Unsuccessful! Please try again later.`,
          autoClose: 3000,
        })
      }
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
                variant="subtle">{signingUp.isOpen ? 'Log In' : 'Sign Up'}
              </Button>
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
          <HeroText subtitle />
          {renderLogInForm()}
        </Container>
      </Box>
    </Flex>
  )
}

export default LandingPage