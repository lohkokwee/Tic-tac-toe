import { useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  Group,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconHome, IconArchive, IconUserCircle } from '@tabler/icons';

const NavButtons = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const smallScreen = useMediaQuery('(max-width:576px)');
  const buttonConfigs = [
    {
      label: "Home",
      route: "/home",
      icon: IconHome
    }, {
      label: "History",
      route: "/history",
      icon: IconArchive
    }, {
      label: "Profile",
      route: "/profile",
      icon: IconUserCircle
    }
  ]

  const renderButtons = () => {
    return (
      <Group position='center' spacing="md">
        {buttonConfigs.map((buttonConfig, idx) => {
          return (
            smallScreen
              ? (
                <Box>
                  <ActionIcon
                    variant='filled'
                    color='blue'
                    radius='xl'
                    onClick={() => { navigate(buttonConfig.route) }}
                  >
                    <buttonConfig.icon size={18}/>
                  </ActionIcon>
                </Box>
              )
              : (
                <Button
                  onClick={
                    () => { navigate(buttonConfig.route) }
                  }
                  radius="xl">
                  {buttonConfig.label}
                </Button>
              )
          );
        })}
      </Group >
    )
  }

  return (
    <Box>
      <Container>
        <Flex justify="center" align="center">
          {renderButtons()}
        </Flex>
        {children}
      </Container>
    </Box>

  )
}

export default NavButtons