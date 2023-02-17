import { Box, BoxProps, Container } from '@mui/material';
import Image from 'next/image';
import React, { FC, PropsWithChildren } from 'react';
interface Props extends BoxProps {
  bgImage: string;
}

const BoxWithBackground: FC<PropsWithChildren<Props>> = ({
  bgImage = '',
  children,
  ...rest
}) => {
  return (
    <Box
      sx={{ position: 'relative', zIndex: 0, paddingBottom: '4rem' }}
      {...rest}
    >
      <Image
        src={bgImage}
        alt="Background image"
        layout="fill"
        objectFit="cover"
        objectPosition="bottom"
      />
      {children}
    </Box>
  );
};

export default BoxWithBackground;
