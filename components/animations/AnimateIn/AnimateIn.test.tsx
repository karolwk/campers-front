import React from 'react';
import { render, screen } from '@testing-library/react';
import { Box } from '@mui/material';
import AnimateIn from './AnimateIn';
import '@testing-library/jest-dom';
// Mock useOnScreen hook
let mockIsOnScreen = false;
jest.mock('../../../hooks/useOnScreen', () => jest.fn(() => mockIsOnScreen));

describe('AnimateIn', () => {
  it('applies the "from" styles when NOT in view and check if the child is rendered', () => {
    render(
      <AnimateIn
        from={{ opacity: 0, translate: '0 2rem' }}
        to={{ opacity: 1, translate: 'none' }}
        component={Box}
        data-testid="test"
      >
        <div data-testid="child" />
      </AnimateIn>
    );
    expect(screen.getByTestId('test')).toHaveStyle({
      opacity: 0,
    });
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
  it('applies the "to" changes style when IN view', () => {
    mockIsOnScreen = true;

    render(
      <AnimateIn
        from={{ opacity: 0, translate: '0 2rem' }}
        to={{ opacity: 1, translate: 'none' }}
        component={Box}
        data-testid="test"
      >
        <div />
      </AnimateIn>
    );

    expect(screen.getByTestId('test')).toHaveStyle({ opacity: 1 });
  });
});
