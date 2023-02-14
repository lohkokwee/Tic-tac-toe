import { useState } from 'react';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { createTheme } from './themes';
import { socket, SocketContext } from './context/socket';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // Set-up for color scheme contexts
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const theme = createTheme(colorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={theme}
        withGlobalStyles
        withNormalizeCSS>
        <NotificationsProvider>
          <SocketContext.Provider value={socket}>
            {children}
          </SocketContext.Provider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default AppProvider;
