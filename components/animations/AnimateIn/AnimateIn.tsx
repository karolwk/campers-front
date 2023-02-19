import React, { FC, PropsWithChildren, useEffect, useState } from 'react';

import { BoxProps } from '@mui/material';
import useOnScreen from '../../../hooks/useOnScreen';

interface AnimateInProps extends BoxProps {
  from: React.CSSProperties;
  to: React.CSSProperties;
  transition?: string;
  component: React.ElementType;
}

const AnimateIn: FC<PropsWithChildren<AnimateInProps>> = ({
  from,
  to,
  component: Component,
  children,
  transition = '650ms ease-in-out',
  ...rest
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);
  const onScreen = useOnScreen(ref);

  let dynamicStyles: React.CSSProperties = {};
  if (!rendered) {
    dynamicStyles = onScreen ? to : from;
  }

  useEffect(() => {
    if (onScreen) {
      setRendered(true);
    }
  }, [onScreen]);

  return (
    <Component
      ref={ref}
      style={{ transition: `${transition}`, ...dynamicStyles }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default AnimateIn;
