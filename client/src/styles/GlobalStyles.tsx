import { Global } from '@mantine/core';

export default function HelaStyles() {
  return (
    <Global
      styles={(theme) => ({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },

        h1: {
            fontFamily: 'Vanilla Macchiato',
            fontSize: '4em',
            marginLeft: 'auto'
        },

        h2: {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            fontFamily: 'SourceSansPro',
        },

        body: {
          ...theme.fn.fontStyles(),
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          lineHeight: theme.lineHeight,
        }
      })}
    />
  );
}