import { Paper, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage  } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import HelaStyles from './styles/GlobalStyles';
import './App.css';
import HelaAppShell from './components/AppShell';

export default function App(){
  
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (

    <div className='App'>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{
          colorScheme,
          colors: {
            ruby: ['#DB1629', '#CC1628', '#BF1525', '#B31423', '#A61220', '#9B111E', '#91101C', '#7D0E18', '#660B13', '#570A10']
          },
          primaryColor: 'ruby',
        }}
          withGlobalStyles withNormalizeCSS>
          <HelaStyles />
          <NotificationsProvider position='bottom-center' limit={5}>
            <Paper>
              <HelaAppShell />
            </Paper>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}