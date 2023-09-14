import { Global } from '@mantine/core';

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Caveat',
            src: `format("ttf")`,
            fontStyle: 'normal',
          },
        },
      ]}
    />
  );
}
