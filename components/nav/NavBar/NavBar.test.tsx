import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NavBar from './NavBar';
import '@testing-library/jest-dom';
const mockStore = configureStore([]);

describe('NavBar component', () => {
  let store: any;
  let navLinks: any;

  beforeEach(() => {
    navLinks = [
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
      { name: 'Contact', url: '/contact' },
    ];
    store = mockStore({
      pageData: {
        email: 'test@test.com',
        phone: '123-456-7890',
      },
    });
  });

  it('renders two logo images', () => {
    const { getAllByAltText } = render(
      <Provider store={store}>
        <NavBar navLinks={navLinks} />
      </Provider>
    );

    expect(getAllByAltText('Logo image')).toHaveLength(2);
  });

  it('toggles mobile menu when menu button is clicked', () => {
    const { getByRole, queryByRole } = render(
      <Provider store={store}>
        <div>
          <NavBar navLinks={navLinks} />
        </div>
      </Provider>
    );
    expect(queryByRole('dialog')).toBeNull();
    fireEvent.click(getByRole('button', { name: 'open drawer' }));
    expect(getByRole('dialog')).toBeInTheDocument();
  });

  it('renders the nav links', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <NavBar navLinks={navLinks} />
      </Provider>
    );

    navLinks.forEach((link: any) => {
      expect(getAllByText(link.name)).toHaveLength(2);
    });
  });
});
