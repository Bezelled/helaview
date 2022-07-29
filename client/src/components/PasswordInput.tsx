import { Anchor, Box, Progress, PasswordInput, PasswordInputProps, Group, Text, Center } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { TbLock, TbCheck, TbX } from 'react-icons/tb';
import { Link } from 'react-router-dom';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text color={meets ? 'teal' : 'red'} mt={5} size='sm'>
      <Center inline>
        {meets ? <TbCheck size={14} stroke='1.5' /> : <TbX size={14} stroke='1.5' />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements: {
    re: RegExp;
    label: string;
}[] = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string): number {
    let multiplier: number = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement:{
      re: RegExp;
      label: string;
    }) => {
        if (!requirement.re.test(password))
          multiplier ++;  // =+ 1;
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export function HelaPasswordSignup() {
  const [value, setValue] = useInputState('');
  const strength = getStrength(value);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: '0ms' } }}
        value={
          value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

  return (
    <div>
      <PasswordInput
        value={value}
        onChange={setValue}
        placeholder='Your password'
        label='Password'
        required
      />

      <Group spacing={5} grow mt='xs' mb='md'>
        {bars}
      </Group>

      <PasswordRequirement label='Has at least 8 characters' meets={value.length > 7} />
      {checks}
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