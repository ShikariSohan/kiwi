import { Global } from '@mantine/core';

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Greycliff CF',
            src: `format("ttf")`,
            fontWeight: 700,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Greycliff CF',
            src: `url('format("ttf")`,
            fontWeight: 900,
            fontStyle: 'normal',
          },
        },
      ]}
    />
  );
}
