import { createStyles, Overlay, Container, Title, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    hero: {
        position: 'relative',
        backgroundImage:
            'url(https://www.traveldailymedia.com/assets/2021/10/shutterstock_1327703336-1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    container: {
        height: 700,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingBottom: theme.spacing.xl * 6,
        zIndex: 1,
        position: 'relative',

        [theme.fn.smallerThan('sm')]: {
            height: 500,
            paddingBottom: theme.spacing.xl * 3,
        },
    },

    title: {
        color: theme.white,
        fontSize: 60,
        fontWeight: 900,
        lineHeight: 1.1,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 40,
            lineHeight: 1.2,
        },

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
            lineHeight: 1.3,
        },
    },

    description: {
        color: theme.white,
        maxWidth: 600,

        [theme.fn.smallerThan('sm')]: {
            maxWidth: '100%',
            fontSize: theme.fontSizes.sm,
        },
    },

    control: {
        marginTop: theme.spacing.xl * 1.5,

        [theme.fn.smallerThan('sm')]: {
            width: '100%',
        },
    },
}));

export default function HelaAbout() {
    const { classes } = useStyles();

    return (
        <div className={classes.hero}>
            <Overlay
                gradient='linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)'
                opacity={1}
                zIndex={0}
            />
            <Container className={classes.container}>
                <Title className={classes.title}>A tourism project by Magma&#174;</Title>
                <Text className={classes.description} size='xl' mt='xl'>
                  We are a multinational company which also takes up local projects. 
                  We have diversified in resourcing projects and software development.
                  We provide resources and develops software applications for local and foreign clients.
                </Text>
            </Container>
        </div>
    );
}