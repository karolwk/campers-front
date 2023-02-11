import React, { FC, PropsWithChildren } from 'react';
import AnimateIn from '../AnimateIn/AnimateIn';

interface LibraryProps {
  component: React.ElementType;
}

const FadeIn: FC<PropsWithChildren<LibraryProps>> = ({
  component,
  children,
}) => (
  <AnimateIn from={{ opacity: 0 }} to={{ opacity: 1 }} component={component}>
    {children}
  </AnimateIn>
);
const FadeUp: FC<PropsWithChildren<LibraryProps>> = ({
  component,
  children,
}) => (
  <AnimateIn
    from={{ opacity: 0, translate: '0 2rem' }}
    to={{ opacity: 1, translate: 'none' }}
    component={component}
  >
    {children}
  </AnimateIn>
);
const ScaleIn: FC<PropsWithChildren<LibraryProps>> = ({
  component,
  children,
}) => (
  <AnimateIn from={{ scale: '0' }} to={{ scale: '1' }} component={component}>
    {children}
  </AnimateIn>
);

export const Animate = {
  FadeIn,
  FadeUp,
  ScaleIn,
};
