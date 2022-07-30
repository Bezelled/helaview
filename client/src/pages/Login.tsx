import {
    Paper,
    createStyles,
    TextInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
} from '@mantine/core';
import HelaPasswordLogin from '../components/PasswordInput';
import { useForm, UseFormReturnType } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { TbMail, TbCheck, TbX } from 'react-icons/tb';
import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 635,
        backgroundSize: 'cover',
        backgroundImage: 'url(https://images.pexels.com/photos/1998434/pexels-photo-1998434.jpeg?cs=srgb&dl=pexels-tom%C3%A1%C5%A1-mal%C3%ADk-1998434.jpg&fm=jpg)',
        backgroundRepeat: 'no-repeat'
    },

    form: {
        borderBlockColor: '2em',
        borderRight: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
        }`,
        minHeight: 635,
        maxWidth: 450,
        paddingTop: 80,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][8],
        fontFamily: `SourceSansPro, ${theme.fontFamily}`,
        fontSize: '2em',
    },

    helaview: {
        fontFamily: `Vanilla Macchiato, SourceSansPro, ${theme.fontFamily}`,
        fontSize: '2em',
    },

    logo: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        width: 120,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

export default function Login() {
    const { classes } = useStyles();

    const form: UseFormReturnType<{
        email: string;
        password: string;
    }> = useForm({
        initialValues: { email: '', password: '' },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/.test(value) ? null : 'Invalid password')
        },
    });

    const handleError = (errors: typeof form.errors) => {

        if (errors.email) {
            
          showNotification({ message: 'Please provide a valid email', color: 'red' });
        } else if (errors.password) {
          showNotification({ message: 'Please provide a valid password', color: 'red' });
        }
    };
    
    const handleSubmit = async(values: typeof form.values) => {

        const randomId: string = uuidv4();

        showNotification({
            id: randomId,
            color: 'teal',
            loading: true,
            title: 'Logging in',
            message: `Trying to login to ${values.email}.`,
            autoClose: false,
            disallowClose: true
        });
        
        try {
            const resp: AxiosResponse<any, any> = await axios.post('/api/tourists/login', {
                'email': values.email,
                'password': values.password
            });
            
            updateNotification({
                id: randomId,
                color: 'teal',
                title: 'Success',
                message: resp.data.message,
                icon: <TbCheck size={16} />,
                autoClose: 3000,
            });
        } catch(err: any) {
            console.log(`Error: ${JSON.stringify(err.response)}.`);
            
            updateNotification({
                id: randomId,
                color: 'red',
                title: 'Error',
                message: err.response.data.error,
                icon: <TbX size={16} />,
                autoClose: 4000,
            });
        };
    };

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} align='center' mt='md' mb={50}>
                    Welcome back to <Text className={classes.helaview}>HelaView!</Text>
                </Title>

                <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
                    <TextInput label='Email address' placeholder='hello@helaview.lk' size='md' icon={<TbMail size={16}/>} required {...form.getInputProps('email')} />
                    <HelaPasswordLogin {...form.getInputProps('password')}/>
                    <Checkbox label='Keep me logged in' mt='xl' size='md' />
                    <Button type='submit' fullWidth mt='xl' size='md'>
                        Login
                    </Button>

                    <Text align='center' mt='md'>
                        Don&apos;t have an account?{' '}
                        <Anchor<'a'> href='/register' weight={700} onClick={(event) => event.preventDefault()}>
                            Register
                        </Anchor>
                    </Text>
                </form>
            </Paper>
        </div>
    );
}