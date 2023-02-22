import { render } from '@testing-library/react';
import BoxWithBackground from './BoxWithBackground';
import '@testing-library/jest-dom';

describe('BoxWithBackground', () => {
  const props = {
    bgImage: '/image.jpg',
    children: <div>test</div>,
  };

  test('renders children and background image', () => {
    const { getByAltText, getByText } = render(
      <BoxWithBackground {...props} />
    );

    expect(getByAltText('Background image')).toBeInTheDocument();
    expect(getByText('test')).toBeInTheDocument();
  });
});
