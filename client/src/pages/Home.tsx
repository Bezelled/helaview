import { Button, useMantineColorScheme } from '@mantine/core';

export default function Home(){
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  
  return (
    <div style={{ padding: '2rem' }}>
      <Button
        color={dark ? 'yellow' : 'blue'}
        onClick={() => toggleColorScheme()}
      >
        Toggle Mode
      </Button>
    </div>
  );
};