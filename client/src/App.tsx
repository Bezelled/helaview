import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage  } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import HelaNavBar from './components/Navbar';
import Login from './pages/Login';
import HelaStyles from './styles/GlobalStyles';
import './App.css';

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
          <NotificationsProvider>
            <AppShell>
              <HelaNavBar mainLinks={[{ link: '/index.html', label: 'Home' },{ link: '/contact_us.html', label: 'Contact Us' }, { link: '/about_us.html', label: 'About Us' }]} userLinks={[]}/>
              <Login />
                {/* Your application here */}
            </AppShell>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}