import {
    Box,
    Paper,
    Text,
    TextInput,
    Textarea,
    ThemeIcon,
    Button,
    Group,
    SimpleGrid,
    Stack,
    createStyles
} from '@mantine/core';
import { MdWorkOutline } from 'react-icons/md';
import { TbAt, TbPhone, TbMapPin } from 'react-icons/tb';

type ContactIconVariant = 'white' | 'gradient';

interface ContactIconStyles {
  variant: ContactIconVariant;
}

const useIconStyles = createStyles((theme, { variant }: ContactIconStyles) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        color: theme.white,
    },

    icon: {
        marginRight: theme.spacing.md,
        backgroundImage:
        variant === 'gradient'
          ? `linear-gradient(135deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
              theme.colors[theme.primaryColor][6]
            } 100%)`
          : 'none'
    },

    title: {
        fontFamily: `SourceSansPro, ${theme.fontFamily}`,
        fontSize: '1em',
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][4]
    },

    description: {
        color: theme.colorScheme === 'dark' ? theme.colors[theme.primaryColor][4] : theme.black
    },
}));

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    icon: React.FC<any>;
    title: React.ReactNode;
    description: React.ReactNode;
    variant?: ContactIconVariant;
}

function ContactIcon({
    icon: Icon,
    title,
    description,
    variant = 'gradient',
    className,
    ...others
}: ContactIconProps) {
    const { classes, cx } = useIconStyles({ variant });
    return (
        <div className={cx(classes.wrapper, className)} {...others}>
        {variant === 'gradient' ? (
            <ThemeIcon size={40} radius='md' className={classes.icon}>
            <Icon size={24} />
            </ThemeIcon>
        ) : (
            <Box mr='md'>
            <Icon size={24} />
            </Box>
        )}

        <div>
            <Text size='xs' className={classes.title}>
            {title}
            </Text>
            <Text className={classes.description}>{description}</Text>
        </div>
        </div>
    );
}

interface ContactIconsListProps {
    data?: ContactIconProps[];
    variant?: ContactIconVariant;
}

const BASE_DATA:{
    title: string;
    description: string;
    icon: any;
}[] = [
    { title: 'Email', description: 'support@helaview.lk', icon: TbAt },
    { title: 'Phone', description: '+94 117 675 100', icon: TbPhone },
    { title: 'Address', description: 'No. 388 Union Pl, Colombo 00200', icon: TbMapPin },
    { title: 'Working hours', description: '9 A.M – 5 P.M.', icon: MdWorkOutline }
];

export function ContactIconsList({ data = BASE_DATA, variant = 'gradient' }: ContactIconsListProps) {
    const items = data.map((item, index) => <ContactIcon key={index} variant={variant} {...item} />);
    return <Stack>{items}</Stack>;
}

const useStyles = createStyles((theme) => {
    const BREAKPOINT: string = theme.fn.smallerThan('sm');
  
    return {
        wrapper: {
            display: 'flex',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            borderRadius: theme.radius.lg,
            padding: 4,
            border: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
            }`,
    
            [BREAKPOINT]: {
                flexDirection: 'column',
            },
        },
    
        form: {
            boxSizing: 'border-box',
            flex: 1,
            padding: theme.spacing.xl,
            paddingLeft: theme.spacing.xl * 2,
            borderLeft: 0,
            color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors[theme.primaryColor][6],
    
            [BREAKPOINT]: {
                padding: theme.spacing.md,
                paddingLeft: theme.spacing.md,
            },
        },
    
        fields: {
            marginTop: -12,
        },
  
        fieldInput: {
            flex: 1,
            
            '& + &': {
                marginLeft: theme.spacing.md,
    
                [BREAKPOINT]: {
                    marginLeft: 0,
                    marginTop: theme.spacing.md,
                },
            },
        },
    
        fieldsGroup: {
            display: 'flex',

            [BREAKPOINT]: {
                flexDirection: 'column',
            },
        },
    
        contacts: {
            boxSizing: 'border-box',
            position: 'relative',
            borderRadius: theme.radius.lg - 2,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid transparent',
            padding: theme.spacing.xl,
            flex: '0 0 280px',
            color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors[theme.primaryColor][6],
            
            [BREAKPOINT]: {
            marginBottom: theme.spacing.sm,
            paddingLeft: theme.spacing.md,
            },
        },
    
        title: {
            marginBottom: theme.spacing.xl * 1.5,
            fontFamily: `SourceSansPro, ${theme.fontFamily}`,
    
            [BREAKPOINT]: {
            marginBottom: theme.spacing.xl,
            },
        },
    
        control: {
            [BREAKPOINT]: {
            flex: 1,
            },
        },
    };
});
  
export default function ContactUs() {
    const { classes } = useStyles();
  
    return (
        <Paper shadow='md' radius='lg'>
            <div className={classes.wrapper}>
                <div className={classes.contacts}>
                    <Text size='xl' weight={800} className={classes.title}>
                        Contact information
                    </Text>
        
                    <ContactIconsList variant='gradient'/>

                </div>
    
                <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
                    <Text size='xl' weight={800} className={classes.title}>
                        Get in touch
                    </Text>
        
                    <div className={classes.fields}>
                        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                            <TextInput label='Your name' placeholder='Your name' />
                            <TextInput label='Your email' placeholder='support@helaview.lk' required />
                        </SimpleGrid>
            
                        <TextInput mt='md' label='Subject' placeholder='Subject' required />
            
                        <Textarea
                            mt='md'
                            label='Your message'
                            placeholder='Please include all relevant information.'
                            minRows={3}
                        />
            
                        <Group position='right' mt='md'>
                            <Button type='submit' className={classes.control}>
                                Send message
                            </Button>
                        </Group>
                    </div>
                </form>
            </div>
        </Paper>
    );
}