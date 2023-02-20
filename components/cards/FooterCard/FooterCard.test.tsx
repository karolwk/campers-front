import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FooterCard from './FooterCard';

const children = <div>Example Children</div>;

describe('FooterCard', () => {
  it('renders the title and children', () => {
    const title = 'Example Title';

    render(<FooterCard title={title}>{children}</FooterCard>);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const childrenElement = screen.getByText('Example Children');
    expect(childrenElement).toBeInTheDocument();
  });

  it('passes extra props to the root element', () => {
    const props = {
      'data-testid': 'test-id',
      className: 'extra-class',
    };

    render(
      <FooterCard title="Example Title" {...props}>
        {children}
      </FooterCard>
    );

    const rootElement = screen.getByTestId('test-id');
    expect(rootElement).toHaveClass('extra-class');
  });
});
