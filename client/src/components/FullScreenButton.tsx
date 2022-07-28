import { useFullscreen } from '@mantine/hooks';
import { ActionIcon } from '@mantine/core';
import { TbViewportNarrow, TbViewportWide } from 'react-icons/tb';

export default function FullScreenButton(className: any) {
  const { toggle, fullscreen } = useFullscreen();

  return (
    <ActionIcon
        variant='outline'
        color='ruby'
        onClick={() => toggle()}
        title='Toggle fullscreen'
        className={className}
    >
        {fullscreen ? (
        <TbViewportNarrow style={{ width: 18, height: 18 }} />
        ) : (
        <TbViewportWide style={{ width: 18, height: 18 }} />
        )}
    </ActionIcon>
    );
}