import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { TbSun, TbMoon } from 'react-icons/tb';

export default function ThemeButton(className: any) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant='outline'
      color={dark ? 'white' : 'ruby'}
      onClick={() => toggleColorScheme()}
      title='Toggle color scheme'
      className={className}
    >
      {dark ? (
        <TbSun style={{ width: 18, height: 18 }} />
      ) : (
        <TbMoon style={{ width: 18, height: 18 }} />
      )}
    </ActionIcon>
  );
}