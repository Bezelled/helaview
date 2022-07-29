import { useState } from 'react';
import { createStyles, Header, Container, Anchor, Group, Burger, Paper, Transition  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ThemeButton from './ColorThemeButton';
import FullScreenButton from './FullScreenButton';
import {ReactComponent as HelaViewLightLogo} from '../images/HelaViewLightLogo.svg'
import { Link, Navigate, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ContactUs from '../pages/ContactUs';
import Login from '../pages/Login';
import HelaNotFound from '../pages/NotFound';
import HelaRegister from '../pages/Register';


const HEADER_HEIGHT: number = 84;

const useStyles = createStyles((theme) => ({

    helaViewText:{
        height: '10rem',
        width: '15rem'
    },

    inner: {
        height: HEADER_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: theme.colors[theme.primaryColor][5]
    },

    dropdown: {
        position: 'absolute',
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: 'hidden',

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    fullScreen: {
    },

    themeButton: {
    },

    burger: {
        color:  theme.colors[theme.primaryColor][8],
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    links: {
        paddingTop: theme.spacing.lg,
        height: HEADER_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        [theme.fn.smallerThan('sm')]: {
        display: 'none',
        },
    },

    mainLinks: {
        marginRight: -theme.spacing.sm
    },

    mainLink: {
        textTransform: 'uppercase',
        fontSize: 13,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        padding: `7px ${theme.spacing.sm}px`,
        fontWeight: 700,
        borderBottom: '2px solid transparent',
        transition: 'border-color 100ms ease, color 100ms ease',

        '&:hover': {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        textDecoration: 'none',
        },
    },

    secondaryLink: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        fontSize: theme.fontSizes.xs,
        textTransform: 'uppercase',
        transition: 'color 100ms ease',

        '&:hover': {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        textDecoration: 'none',
        },
    },

    mainLinkActive: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottomColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6],
    },
}));

interface LinkProps {
    label: string;
    link: string;
}

interface DoubleHeaderProps {
    mainLinks: LinkProps[];
    userLinks: LinkProps[];
}

export default function HelaHeader({ mainLinks, userLinks }: DoubleHeaderProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const { classes, cx } = useStyles();
    const [active, setActive] = useState(0);

    const mainItems = mainLinks.map((item, index) => (
        <Anchor
            component={Link}
            to={item.link}
            key={item.label}
            className={cx(classes.mainLink, { [classes.mainLinkActive]: index === active })}
            onClick={(event: { preventDefault: () => void; }) => {
                setActive(index);
            }}
        >
            {item.label}
        </Anchor>
    ));

    const secondaryItems = userLinks.map((item) => (
        <Anchor
            component={Link}
            to={item.link}
            key={item.label}
            className={classes.secondaryLink}
        >
            {item.label}
        </Anchor>
    ));

    return (
        <Header height={HEADER_HEIGHT} mb={120}>
            <Container color='ruby' className={classes.inner}>
              <div>
                <HelaViewLightLogo className={classes.helaViewText} fill='#ffffff'/>
              </div>

              <div className={classes.links}>
              <Group color='ruby' position='right'>{secondaryItems}</Group>
              <Group color='ruby' spacing={0} position='right' className={classes.mainLinks}>
                  {mainItems}
              </Group>
              </div>
              <FullScreenButton className={classes.fullScreen}/>
              <ThemeButton className={classes.themeButton}/>
              <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />

              <Transition transition='pop-top-right' duration={200} mounted={opened}>
                {(styles) => (
                  <Paper color='ruby' className={classes.dropdown} withBorder style={styles}>
                    {mainItems}
                  </Paper>
                )}
              </Transition>
            </Container>

            <Routes>
                <Route path='' element={<Navigate to='/home' />} />
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/aboutUs' element={<Login />} />
                <Route path='/contactUs' element={<ContactUs />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<HelaRegister />} />
                <Route path='*' element={<HelaNotFound />} />

            </Routes>

        </Header>
    );
}