import { useState } from 'react';
import { Button, List, Text } from '@mantine/core';
import { useId } from '@mantine/hooks';

export const UseIdPage = ({ id }: { id?: string }) => {
    const uuid = useId(id);
    const [state, setState] = useState(uuid);

    const generateId = () => {
        setState(uuid);
        window.location.reload();
    };

    return (
        <>
        <Text style={{ marginTop: '2rem' }} size='xl'>
            UseId Hook
        </Text>
        <List>
            <List.Item>Logrocket - id - {state}</List.Item>
            <Button style={{ marginTop: '1rem' }} onClick={generateId}>
                Generate New ID
            </Button>
        </List>
        </>
    );
};