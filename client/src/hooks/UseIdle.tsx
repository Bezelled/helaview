import { Button, Text } from '@mantine/core';
import { useIdle } from '@mantine/hooks';

export const UseIdlePage = () => {
  const idle = useIdle(2000, { events: ['click', 'touchstart'] });
  return (
    <>
      <Text style={{ marginTop: '2rem' }} size='xl'>
        UseIdle State
      </Text>
      <Button color={idle ? 'gray' : 'green'}>
        Current state: {idle ? 'idle' : 'not idle'}
      </Button>
    </>
  );
};