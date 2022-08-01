import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Group,
    Button,
    Checkbox,
    Anchor,
    NumberInput,
    Textarea,
    createStyles,
    Container
} from '@mantine/core';
import { TbCalendar, TbCheck, TbMapPin, TbX } from 'react-icons/tb';
import axios, { AxiosResponse } from 'axios';
import { showNotification, updateNotification } from '@mantine/notifications';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => {
    const BREAKPOINT: string = theme.fn.smallerThan('sm');

    return {

        wrapper: {
            position: 'relative',
            boxSizing: 'border-box',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            overflow: 'auto'
          },
        
          inner: {
            position: 'relative',
        
            [BREAKPOINT]: {
              paddingBottom: 80,
              paddingTop: 80,
            },
          },
    
        form: {
            boxSizing: 'border-box',
            flex: 1,
            maxHeight: 500,
            maxWidth: 600,
            alignContent: 'center',
            padding: theme.spacing.xl,
            paddingLeft: theme.spacing.xl * 2,
            color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors[theme.primaryColor][6],
            [BREAKPOINT]: {
                padding: theme.spacing.md,
                paddingLeft: theme.spacing.md,
            },
        }
    };
});

export default function HelaRegister() {
    const { classes } = useStyles();
    const form = useForm({
        initialValues: {
            firstName:'',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            age: 13,
            gender: 'M',
            country: 'LK',
            passport:'',
            address: '',
            contact: '',
            terms: true
        },

        validate: {
            firstName: (val) => /^\S+@\S+$/.test(val) && 'Invalid first name',
            // lastName: (val) => {},
            email: (val) => /^\S+@\S+$/.test(val) && 'Invalid email',
            password: (val) => val.length >= 6 && 'Password should include at least 6 characters',
            gender:  (val) => (['', ''].includes(val)) && 'Please pick M or F',
            // country: (val) => {},
            // address: (val) => {},
            contact: (val) => (Number.isNaN(val) && val.toString().length <= 10) && 'Please enter a valid contact number',
            terms: (val: boolean) => (val === true) && 'Please accept the Terms and Conditions',
            
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
            const resp: AxiosResponse<any, any> = await axios.post('/api/tourists/register', {
                'first name': values.firstName,
                'last name': values.lastName,
                'email': values.email,
                'password': values.password,
                'password confirmation': values.passwordConfirmation,
                'passport number': values.passport,
                'age': values.age,
                'gender': values.gender,
                'country': values.country,
                'address': values.address,
                'contact number': values.contact,
                'terms': values.terms
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
        <Container size={700} className={classes.inner}>
            <form className={classes.form} onSubmit={form.onSubmit(handleSubmit, handleError)}>
                <TextInput
                    {...form.getInputProps('firstName')}
                    required
                    label='First name'
                    placeholder='Your name'
                />

                <TextInput
                    {...form.getInputProps('lastName')}
                    label='Last name'
                    placeholder='Your last name'
                />

                <TextInput
                    {...form.getInputProps('email')}
                    required
                    label='Email'
                    placeholder='hello@helaview.lk'
                />

                <PasswordInput
                    {...form.getInputProps('password')}
                    required
                    label='Password'
                    placeholder='Your password'
                />

                <PasswordInput
                    {...form.getInputProps('passwordConfirmation')}
                    required
                    label='Password confirmation'
                    placeholder='Retype your password'
                />

                <NumberInput
                    {...form.getInputProps('age')}
                    required
                    placeholder='Your age'
                    label='Age'
                    max={120}
                    min={0}
                    icon={<TbCalendar size={16} />}
                />

                <TextInput
                    {...form.getInputProps('contact')}
                    required
                    type='tel'
                    label='Contact number'
                    placeholder='Your contact number'
                />

                <TextInput
                    {...form.getInputProps('passport')}
                    label='Passport'
                    placeholder='Your passport number'
                />

                <Textarea
                    {...form.getInputProps('address')}
                    label='Your address'
                    icon={<TbMapPin size={16} />}
                />

                <Checkbox
                    {...form.getInputProps('terms')}
                    label='I accept the Terms and Conditions'
                    required
                />

                <Group position='apart' mt='xl'>
                    <Anchor
                        component={Link}
                        to='/login'
                        color='dimmed'
                        size='xs'
                    >
                        Already have an account? Login
                    </Anchor>
                    <Button type='submit'>Register</Button>
                </Group>
            </form>
        </Container>
    </div>
    );
}