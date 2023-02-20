import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import CamperCard from './CamperCard';
import userEvent from '@testing-library/user-event';
import { mockCamper } from '../../../shared/mockedData';
import { makeURLfromName } from '../../../utils/helpers';

describe('CamperCard', () => {
  it('renders the camper name', () => {
    render(<CamperCard camper={mockCamper} />);
    const nameElement = screen.getByText(mockCamper.name);
    expect(nameElement).toBeInTheDocument();
  });

  it('renders the camper image', () => {
    render(<CamperCard camper={mockCamper} />);
    const imageElement = screen.getByAltText(mockCamper.name + ' obraz');
    expect(imageElement).toBeInTheDocument();
  });

  it('renders the camper price', () => {
    render(<CamperCard camper={mockCamper} />);
    const priceElement = screen.getByText(
      `od ${mockCamper.price[0].price} zł/doba`
    );
    expect(priceElement).toBeInTheDocument();
  });

  it('renders the camper amenities', () => {
    render(<CamperCard camper={mockCamper} />);

    const amenity1Element = screen.getByText(mockCamper.mainAmenities[0].name);

    const amenity2Element = screen.getByText(mockCamper.mainAmenities[1].name);
    expect(amenity1Element).toBeInTheDocument();
    expect(amenity2Element).toBeInTheDocument();
  });

  it('renders the detailed description button', () => {
    render(<CamperCard camper={mockCamper} />);
    const buttonElement = screen.getByText('Opis szczegółowy');
    expect(buttonElement).toBeInTheDocument();
  });
});
