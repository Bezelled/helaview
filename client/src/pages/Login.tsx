import PasswordField from '../components/PasswordInput';
import { useForm, UseFormReturnType } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

export default function Login(){

    const form: UseFormReturnType<{
        email: string;
        password: string;
    }> = useForm({
        initialValues: { email: '', password: '' },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$').test(value) ? null : 'Invalid password'),
        },
    });

    const handleError = (errors: typeof form.errors) => {

        if (errors.email) {
          showNotification({ message: 'Please provide a valid email', color: 'red' });
        } else if (errors.password) {
          showNotification({ message: 'Please provide a valid password', color: 'red' });
        }
    };
    
    const handleSubmit = (values: typeof form.values) => {
        console.log(values);
    };

    return (
        <html>
            <head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
                <title>Sign In to Helaview</title>
            </head>
            <div>
                <div style={{ padding: '2rem' }}>
                    Helaview : Login
                </div>
                <div style={{ padding: '8rem', paddingTop: '4em' }}>
                    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
                        <TextInput mt='sm' label='Email' placeholder='Email' required {...form.getInputProps('email')} />
                        <PasswordField />
                        <Button type='submit' mt='sm' style={{color: 'white', backgroundColor: 'green'}}>
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </html>
    );
}