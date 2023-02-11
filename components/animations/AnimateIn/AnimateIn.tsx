import { Box } from '@mui/material';
import React, { FC, PropsWithChildren, forwardRef } from 'react';

import useOnScreen from '../../../hooks/useOnScreen';

interface AnimateInProps {
  from: React.CSSProperties;
  to: React.CSSProperties;
  component: React.ElementType;
}

const AnimateIn: FC<PropsWithChildren<AnimateInProps>> = ({
  from,
  to,
  component: Component,
  children,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const defaultStyles: React.CSSProperties = {
    transition: '600ms ease-in-out',
  };
  const dynamicStyles: React.CSSProperties = onScreen ? to : from;
  return (
    <Component ref={ref} style={{ ...defaultStyles, ...dynamicStyles }}>
      {children}
    </Component>
  );
};

export default AnimateIn;
