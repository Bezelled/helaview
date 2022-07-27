import { useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { TextInput, Text } from '@mantine/core';

export const UseDebouncedValuePage = () => {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 500);

  return (
    <>
      <TextInput
        label='Enter value to see debounce'
        value={value}
        style={{ flex: 1, marginTop: '2rem' }}
        onChange={(event) => setValue(event.currentTarget.value)}
      />

      <Text>Value: {value}</Text>
      <Text>Debounced value: {debounced}</Text>
    </>
  );
};