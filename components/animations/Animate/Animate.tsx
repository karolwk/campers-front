import React, { FC, PropsWithChildren } from 'react';
import AnimateIn from '../AnimateIn/AnimateIn';
import { BoxProps } from '@mui/material';
import { AnimateInProps } from '../AnimateIn/AnimateIn';

const FadeIn: FC<PropsWithChildren<AnimateInProps>> = ({
  children,
  ...rest
}) => (
  <AnimateIn from={{ opacity: 0 }} to={{ opacity: 1 }} {...rest}>
    {children}
  </AnimateIn>
);
const FadeUp: FC<PropsWithChildren<AnimateInProps>> = ({
  children,
  ...rest
}) => (
  <AnimateIn
    from={{ opacity: 0, translate: '0 2rem' }}
    to={{ opacity: 1, translate: 'none' }}
    {...rest}
  >
    {children}
  </AnimateIn>
);
const ScaleIn: FC<PropsWithChildren<AnimateInProps>> = ({
  children,
  ...rest
}) => (
  <AnimateIn from={{ scale: '0' }} to={{ scale: '1' }} {...rest}>
    {children}
  </AnimateIn>
);

const SlideFromLeft: FC<PropsWithChildren<AnimateInProps>> = ({
  children,
  ...rest
}) => (
  <AnimateIn
    from={{ opacity: 0, filter: 'blur(5px)', transform: 'translateX(-100%)' }}
    to={{ opacity: 1, filter: 'blur(0)', transform: 'translateX(0)' }}
    {...rest}
  >
    {children}
  </AnimateIn>
);

export const Animate = {
  FadeIn,
  FadeUp,
  ScaleIn,
  SlideFromRihght: SlideFromLeft,
};
