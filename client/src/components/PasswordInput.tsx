import { Anchor, Box, Progress, PasswordInput, PasswordInputProps, Text, Popover } from '@mantine/core';
import { useState } from 'react';
import { TbLock, TbCheck, TbX } from 'react-icons/tb';
import { Link } from 'react-router-dom';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size='sm'
    >
      {meets ? <TbCheck size={16} /> : <TbX size={16} />} <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' }
];

function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier++;// += 1
      }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export function HelaPasswordSignUp() {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState('');
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <div style={{ maxWidth: 340, margin: 'auto' }}>
      <Popover opened={popoverOpened} position='bottom' width='target' transition='pop'>
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            <PasswordInput
              required
              label='Your password'
              placeholder='Your password'
              icon={<TbLock size={16}/>}
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
          <PasswordRequirement label='Includes at least 6 characters' meets={value.length > 5} />
          {checks}
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

export default function HelaPasswordLogin({ className, style, ...others }: PasswordInputProps) {
  return (
    <div className={className} style={style}>
      <PasswordInput
        placeholder='Your password'
        label='Password'
        required
        id='your-password'
        icon={<TbLock size={16}/>}
        mt='md'
        size='md'
        {...others} />
      <Text align='right' mt='xs'>
        <Anchor
            component={Link}
            to='/forgotPassword'
            sx={(theme) => ({
              paddingTop: 2,
              color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
              fontWeight: 500,
              fontSize: theme.fontSizes.xs
            })}
          >
            Forgot your password?
        </Anchor>
      </Text>
    </div>
  );
}

export function HelaPasswordConfirm() {
    return (
        <PasswordInput
            placeholder='Confirm Password'
            label='Confirm Password'
            icon={<TbLock size={16}/>}
            required
        />
    );
}