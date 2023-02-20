import { render, screen } from '@testing-library/react';
import PriceCard from './PriceCard';
import '@testing-library/jest-dom';

const mockPrice = {
  price: 100,
  sesons: 'Season 1',
  info: 'Info 1',
};

describe('PriceCard', () => {
  it('should render the price and season', () => {
    render(<PriceCard price={mockPrice} />);

    const season = screen.getByText('Season 1');
    expect(season).toBeInTheDocument();

    const price = screen.getByText('100zł / doba');
    expect(price).toBeInTheDocument();
  });

  it('should render the price info', () => {
    render(<PriceCard price={mockPrice} />);

    const priceInfo = screen.getByText('Info 1');
    expect(priceInfo).toBeInTheDocument();
  });
});
