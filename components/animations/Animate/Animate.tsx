import React, { FC, PropsWithChildren } from 'react';
import AnimateIn from '../AnimateIn/AnimateIn';
import { BoxProps } from '@mui/material';

interface LibraryProps extends BoxProps {
  component: React.ElementType;
  transition?: string;
}

const FadeIn: FC<PropsWithChildren<LibraryProps>> = ({
  transition,
  component,
  children,
  ...rest
}) => (
  <AnimateIn
    from={{ opacity: 0 }}
    to={{ opacity: 1 }}
    component={component}
    transition={transition}
    {...rest}
  >
    {children}
  </AnimateIn>
);
const FadeUp: FC<PropsWithChildren<LibraryProps>> = ({
  component,
  transition,
  children,
  ...rest
}) => (
  <AnimateIn
    from={{ opacity: 0, translate: '0 2rem' }}
    to={{ opacity: 1, translate: 'none' }}
    component={component}
    transition={transition}
    {...rest}
  >
    {children}
  </AnimateIn>
);
const ScaleIn: FC<PropsWithChildren<LibraryProps>> = ({
  component,
  transition,
  children,
  ...rest
}) => (
  <AnimateIn
    from={{ scale: '0' }}
    to={{ scale: '1' }}
    component={component}
    transition={transition}
    {...rest}
  >
    {children}
  </AnimateIn>
);

export const Animate = {
  FadeIn,
  FadeUp,
  ScaleIn,
};
