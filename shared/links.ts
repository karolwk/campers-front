export const navLinks = [
  {
    name: 'Główna',
    url: '/',
  },
  {
    name: 'O nas',
    url: '/#about',
  },
  {
    name: 'Kampery',
    url: '/kampery',
  },
  {
    name: 'Warunki wynajmu',
    url: '#',
  },

  {
    name: 'Kontakt',
    url: '/kontakt',
  },
];

export const footerLinks = [
  ...navLinks.slice(0, -1),
  { name: 'Polityka Prywatności', url: '/polityka-prywatności' },
  ...navLinks.slice(navLinks.length - 1),
];
