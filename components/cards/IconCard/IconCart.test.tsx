import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconCard from './IconCard';

const mockIconData = {
  iconURL: 'https://example.com/icon1.png',
  iconTitle: 'Icon 1',
  iconDescription: 'Description 1',
};

describe('IconCard', () => {
  it('renders icon title and description', () => {
    const { getByText } = render(
      <IconCard
        iconURL={mockIconData.iconURL}
        iconTitle={mockIconData.iconTitle}
        iconDescription={mockIconData.iconDescription}
      />
    );
    expect(getByText(mockIconData.iconTitle)).toBeInTheDocument();
    expect(getByText(mockIconData.iconDescription)).toBeInTheDocument();
  });

  it('renders icon image with correct alt text', () => {
    const { getByAltText } = render(
      <IconCard
        iconURL={mockIconData.iconURL}
        iconTitle={mockIconData.iconTitle}
        iconDescription={mockIconData.iconDescription}
      />
    );
    expect(getByAltText(`${mockIconData.iconTitle} icon`)).toBeInTheDocument();
  });
});
