import { createStyles, Text, Container, ActionIcon, Group, Footer } from '@mantine/core';
import { TbBrandTwitter, TbBrandYoutube, TbBrandInstagram } from 'react-icons/tb';

const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: 120,
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    logo: {
        maxWidth: 200,

        [theme.fn.smallerThan('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    description: {
        fontFamily: `SourceSansPro, ${theme.fontFamily}`,
        fontSize: '1.5em',
        fontWeight: 600,
        marginTop: 5,
        textAlign: 'left',
        color: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors[theme.primaryColor][4],
        
        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
            textAlign: 'center',
        },
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    groups: {
        display: 'flex',
        flexWrap: 'wrap',

        [theme.fn.smallerThan('sm')]: {
        display: 'none',
        },
    },

    wrapper: {
        width: 160,
    },

    link: {
        display: 'block',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        fontSize: theme.fontSizes.sm,
        paddingTop: 3,
        paddingBottom: 3,

        '&:hover': {
        textDecoration: 'underline',
        },
    },

    title: {
        fontSize: '1.5em',
        fontWeight: 700,
        fontFamily: `Vanilla Macchiato, SourceSansPro, ${theme.fontFamily}`,
        marginBottom: theme.spacing.xs / 2,
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][6],
    },

    afterFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
        },
    },

    social: {
        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
        },
    },
    }));

    interface FooterLinksProps {
    data: {
        title: string;
        links: { label: string; link: string }[];
    }[];
    }

export default function HelaFooter({ data }: FooterLinksProps) {
  const { classes } = useStyles();

    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
        <Text<'a'>
            key={index}
            className={classes.link}
            component='a'
            href={link.link}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </Text>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <Footer height={260} p='md' className={classes.footer} style={{ position: 'relative' }}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                <Text size='md' color='dimmed' className={classes.description}>
                    Book your Sri Lankan dream vacation now!
                </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text color='dimmed' size='sm'>
                © 2022 helaview.lk. All rights reserved.
                </Text>

                <Group spacing={0} className={classes.social} position='right' noWrap>
                <ActionIcon size='lg'>
                    <TbBrandTwitter size={18} stroke='1.5' />
                </ActionIcon>
                <ActionIcon size='lg'>
                    <TbBrandYoutube size={18} stroke='1.5' />
                </ActionIcon>
                <ActionIcon size='lg'>
                    <TbBrandInstagram size={18} stroke='1.5' />
                </ActionIcon>
                </Group>
            </Container>
        </Footer>
    );
}