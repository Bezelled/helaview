import { NumberInput, Text } from '@mantine/core';

export default function NumberInputField(text: string, placeholder: string = '', label: string = ''){
  return (
    <>
      <Text style={{ marginTop: '2rem' }} size='xl'>
        {`${text}`}
      </Text>
      <NumberInput
        defaultValue={50}
        placeholder={`${placeholder}`}
        label={`${label}`}
        required
      />
    </>
  );
}