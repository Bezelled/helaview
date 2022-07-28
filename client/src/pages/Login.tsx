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
import { showNotification } from '@mantine/notifications';
import { TbMail } from 'react-icons/tb';
import axios, { AxiosResponse } from 'axios';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 635,
        backgroundSize: 'cover',
        backgroundImage: 'url(https://images.pexels.com/photos/1998434/pexels-photo-1998434.jpeg?cs=srgb&dl=pexels-tom%C3%A1%C5%A1-mal%C3%ADk-1998434.jpg&fm=jpg)',
        backgroundRepeat: 'no-repeat'
    },

    form: {
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
        const resp: AxiosResponse<any, any> = await axios.post('/api/tourists/login', {
            'email': values.email,
            'password': values.password
        });
        
        switch(resp.status)
        {
            case 200:
                showNotification({ message: resp.data.message, color: 'green' });
                break;
            case 400:
                showNotification({ message: resp.data.error, color: 'red' });
                break;
        };

        console.log(resp.data);
    };

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} align='center' mt='md' mb={50}>
                    Welcome back to HelaView!
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