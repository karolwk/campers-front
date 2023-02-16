import Image from 'next/image';
import MuiLink from '@mui/material/Link';
import { LinkProps } from 'next/link';
import React from 'react';
import Link from 'next/link';

interface Props extends LinkProps {
  alt?: string;
  width?: number;
}

const LogoImage = ({
  href = '/',
  alt = 'Logo image',
  width = 150,
  ...rest
}: Props) => {
  return (
    <Link href={href} passHref {...rest}>
      <MuiLink>
        <Image
          src="/images/logo.png"
          alt={alt}
          width={width}
          height={width / 1.875}
        />
      </MuiLink>
    </Link>
  );
};

export default LogoImage;
