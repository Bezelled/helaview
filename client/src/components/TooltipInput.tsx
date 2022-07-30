import { useState } from 'react';
import { TextInput, PasswordInput, Tooltip, Center, Text, MantineTransition } from '@mantine/core';
import { TbInfoCircle } from 'react-icons/tb';
import { FloatingPosition } from '@mantine/core/lib/Floating';

export default function TooltipIcon(label: string, position: FloatingPosition = 'top-end', transition: MantineTransition = 'pop-bottom-right') {
    const rightSection = (
      <Tooltip
        label={label}
        position={position}
        withArrow
        transition={transition}
      >
        <Text color='dimmed' sx={{ cursor: 'help' }}>
          <Center>
            <TbInfoCircle size={18} stroke='1.5' />
          </Center>
        </Text>
      </Tooltip>
  );

  return (
      <TextInput
        rightSection={rightSection}
        label='Tooltip shown on icon hover'
        placeholder='Your email'
      />
    );
}

export function TooltipFocus() {
    const [opened, setOpened] = useState(false);
    const [value, setValue] = useState('');
    const valid = value.trim().length >= 6;
    return (
      <Tooltip
        label={valid ? 'All good!' : 'Password must include at least 6 characters'}
        position='bottom-start'
        withArrow
        opened={opened}
        color={valid ? 'teal' : undefined}
      >
        <PasswordInput
          label='Tooltip shown onFocus'
          required
          placeholder='Your password'
          onFocus={() => setOpened(true)}
          onBlur={() => setOpened(false)}
          mt='md'
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </Tooltip>
  );
}