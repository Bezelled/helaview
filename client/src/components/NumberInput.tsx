import { NumberInput, Text } from '@mantine/core';

const NumberInputPage = () => {
  return (
    <>
      <Text style={{ marginTop: '2rem' }} size='xl'>
        Number Input Component
      </Text>
      <NumberInput
        defaultValue={50}
        placeholder='Your age'
        label='Your age'
        required
      />
    </>
  );
};

export default NumberInputPage;