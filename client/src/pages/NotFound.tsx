import { createStyles, Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import errorImage from '../images/error-404.svg';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontWeight: 'bolder',
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Vanilla Macchiato, SourceSansPro, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

export default function NotFoundPage() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
        <Image src={errorImage} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text color='dimmed' size='lg'>
            The page you are trying to access does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error, please contact support.
          </Text>
          <Button variant='outline' size='md' mt='xl' className={classes.control}>
            Take me back to the home page
          </Button>
        </div>
        <Image src={errorImage} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}