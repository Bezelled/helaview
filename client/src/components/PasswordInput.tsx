import { PasswordInput } from '@mantine/core';
import { TbLock } from 'react-icons/tb';

export default function PasswordField(){
    return (
        <PasswordInput
            placeholder='Password'
            label='Password'
            description='Password must be 8-20 characters, including at least one upper & lowercase letter, number and special character.'
            icon={<TbLock size={8}/>}
            required
        />
    );
}

export function ConfirmPasswordField() {
    return (
        <PasswordInput
            placeholder='Confirm Password'
            label='Confirm Password'
            icon={<TbLock size={8}/>}
            required
        />
    );
}