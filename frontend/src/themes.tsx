import {
  MantineThemeOverride,
  ColorScheme as ColorSchemeType,
  MantineTheme,
} from '@mantine/core';

export const getLightDarkTextColorsFromTheme = (theme: MantineTheme) => ({
  color: theme.colorScheme === 'dark'
    ? theme.colors.gray[0]
    : theme.black,
})

export const getLightDarkBackgroundColors = (theme: MantineTheme, isElevated: boolean = false) => {
  const darkColor = isElevated ? theme.colors.dark[7] : theme.colors.dark[8];
  const lightColor = isElevated ? theme.white : theme.colors.gray[0]

  return ({
    backgroundColor: theme.colorScheme === 'dark' ? darkColor : lightColor,
  })
}

export const getBorderTheme = (theme: MantineTheme) => ({
  border: 3,
  borderStyle: 'solid',
  borderColor: theme.colors.blue[6],
  borderRadius: theme.radius.md
})

export const getDimemdColor = (theme: MantineTheme) => ({
  color: theme.colorScheme === 'dark'
  ? theme.colors.dark[2]
  : theme.colors.gray[6],
})

export const getButtonTheme = (theme: MantineTheme) => {
  const isDarkTheme = theme.colorScheme === 'dark'

  return ({
    buttonColor: isDarkTheme
      ? theme.colors.blue[1]
      : theme.colors.blue[7],
    buttonBackgroundColor: isDarkTheme
      ? theme.colors.blue[1]
      : theme.colors.blue[7],
    buttonBackgroundColorStr: isDarkTheme
      ? "blue.8"
      : "blue.1"
  })
};

export const createTheme = (colorScheme: ColorSchemeType): MantineThemeOverride => {
  return {
    colorScheme,
    fontFamily: "DM Sans, sans-serif",
    headings: { fontFamily: "DM Serif Display, serif" },
    components: {
      Title: {
        styles: (theme: MantineTheme) => ({
          root: {
            ...getLightDarkTextColorsFromTheme(theme),
          }
        })
      },
      Text: {
        styles: (theme: MantineTheme) => ({
          root: {
            ...getLightDarkTextColorsFromTheme(theme),
          }
        })
      },
      Button: {
        styles: (theme: MantineTheme) => ({
          root: {
          }
        }) 
      },
      ActionIcon: {
        styles: (theme: MantineTheme) => ({
          root: {
            ...getLightDarkTextColorsFromTheme(theme)
          }
        })
      }
    }
  }
};