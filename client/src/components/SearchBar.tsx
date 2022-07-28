import { TextInput, TextInputProps, ActionIcon, MantineTheme, useMantineTheme } from '@mantine/core';
import { TbSearch, TbArrowRight, TbArrowLeft } from 'react-icons/tb';

export default function HelaSearchBar(props: TextInputProps) {
  const theme: MantineTheme = useMantineTheme();

  return (
    <TextInput
      icon={<TbSearch size={18} stroke='1.5' />}
      radius='xl'
      size='md'
      rightSection={
        <ActionIcon size={32} radius='xl' color={theme.primaryColor} variant='filled'>
          {theme.dir === 'ltr' ? (
            <TbArrowRight size={18} stroke='1.5' />
          ) : (
            <TbArrowLeft size={18} stroke='1.5' />
          )}
        </ActionIcon>
      }
      placeholder='Search hotel profiles'
      rightSectionWidth={42}
      {...props}
    />
  );
}