import React, { FC, PropsWithChildren, useEffect, useState } from 'react';

import { BoxProps } from '@mui/material';
import useOnScreen from '../../../hooks/useOnScreen';

export interface AnimateInProps extends BoxProps {
  from?: React.CSSProperties;
  to?: React.CSSProperties;
  transition?: string;
  transitionDelay?: string;
  component: React.ElementType;
}

const AnimateIn: FC<PropsWithChildren<AnimateInProps>> = ({
  from = {},
  to = {},
  component: Component,
  children,
  className,

  transition = '650ms ease-in-out',
  transitionDelay = '0ms',
  ...rest
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);
  const onScreen = useOnScreen(ref);
  const NoAnimationClass = 'NoAnimations';

  let dynamicStyles: React.CSSProperties = {};

  dynamicStyles = rendered ? to : from;

  useEffect(() => {
    if (onScreen) {
      setRendered(true);
    }
  }, [onScreen]);

  return (
    <Component
      ref={ref}
      className={
        className ? `${className} + ${NoAnimationClass}` : NoAnimationClass
      }
      style={{
        transition: `${transition}`,
        transitionDelay: `${transitionDelay}`,
        ...dynamicStyles,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default AnimateIn;
