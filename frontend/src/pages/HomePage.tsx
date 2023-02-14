import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import {
  Box,
  Button,
  Container,
  Flex,
  TextInput,
  Modal,
  Title,
  Text,
  Group,
  LoadingOverlay
} from '@mantine/core';
import { showNotification } from "@mantine/notifications";

import { useForm } from '@mantine/form';
import { validateEmail } from '../schema/validations';
import { ENDPOINT } from '../constants';
import { User } from '../types'
import getData from '../services/baseServices/getData';
import { SocketContext } from '../context/socket';
import useToggleState from '../hooks/useToggleState';

const HomePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [opponent, setOpponent] = useState<User | null> (null);
  const modalState = useToggleState(false);
  const waitingState = useToggleState(false);
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const form = useForm({
    initialValues: {
      opponent_email: '',
    },
    validate: {
      opponent_email: (value) => validateEmail(value) || value !== user?.email ? 'Invalid email.' : null
    }
  });

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
          setUser(data[0]?.user);
          console.log(user)
        });
    } catch (error) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    socket.on(`opponent_unavailable_${user?.id}`, () => {
      waitingState.close()
      showNotification({
        color: "red",
        message: `Opponent unavailable. Please try again later!`,
        autoClose: 3000,
      })
    })

    socket.on(`incoming_challenge_${user?.id}`, (opponent: User) => {
      console.log(opponent)
      modalState.open();
      setOpponent(opponent);
    })

    socket.on(`challenge_rejected`, (data: User) => {
      if (data.id === user?.id) {
        waitingState.close();
      }
    })

    socket.on(`challenge_accepted`, (data: User) => {
      if (data.id === user?.id) {
        waitingState.close();
      }
    })

    return () => {
      socket.off(`opponent_unavailable_${user?.id}`)
      socket.off(`incoming_challenge_${user?.id}`)
      socket.off(`challenge_rejected`)
      socket.off(`challenge_accepted`)
    }
  }, [socket, user])

  const handleOnSubmit = (values: any) => {
    const socket = io(`${ENDPOINT}`)
    const challenge_data = {
      user_id: user?.id,
      opponent_email: values?.opponent_email
    }
    socket.emit('challenge', challenge_data);
    waitingState.open();
  }

  const renderGameForm = () => {
    return (
      <Box>
        <LoadingOverlay visible={waitingState.isOpen} overlayBlur={1} />
        <form onSubmit={form.onSubmit((values) => (handleOnSubmit(values)))}>
          <Box mt="xs">
            <TextInput
              label="Enter opponent's email"
              {...form.getInputProps('opponent_email')}
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

  const renderInviteModal = () => {
    const handleReject = () => {
      modalState.close();
      socket.emit('reject', opponent)
    }

    const handleAccept = () => {
      modalState.close();
      socket.emit('accept', opponent)
    }

    return (
      <Modal
        centered
        opened={modalState.isOpen}
        onClose={modalState.close}>
        <Flex my='xl' justify='center' align='center'>
          <Box>
            <Container mb={5} px={0}>
              <Title align='center' order={1}>GAME INVITATION</Title>
            </Container>              
            <Container mb="xl">
              <Text align='center'>Would you like to accept the game invite from {opponent?.email}?</Text>
            </Container>
            <Group spacing="lg" position='center'>
              <Box sx={{width: "40%"}}>
                <Button fullWidth color="red" onClick={handleReject}>No</Button>
              </Box>
              <Box sx={{width: "40%"}}>
                <Button fullWidth color="green" onClick={handleAccept}>Yes</Button>
              </Box>
            </Group>
          </Box>
        </Flex>
      </Modal>
    );
  }

  return (
    <Flex justify="center">
      <Box m="xl">
        <Container>
          {renderInviteModal()}
          {renderGameForm()}
        </Container>
      </Box>
    </Flex >
  )
}

export default HomePage