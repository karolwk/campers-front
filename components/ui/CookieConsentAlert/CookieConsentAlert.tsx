import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Snackbar, SnackbarContent } from '@mui/material';
import useCookie from '../../../hooks/useCookie';
import Link from 'next/link';

type Props = {};

const CookieConsentAlert = (props: Props) => {
  const [cookieValue, updateCookie, deleteCookie] = useCookie('cookie-conset');
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = useCallback(() => {
    updateCookie('1', { expires: 30 });
    setShowAlert(false);
  }, [updateCookie]);

  useEffect(() => {
    if (!cookieValue) {
      setShowAlert(true);
    }
  }, [cookieValue]);

  if (!showAlert) {
    return null;
  }

  return (
    <Snackbar
      open={showAlert}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <SnackbarContent
        message="Używanie strony www.kamperynawynajem.pl oznacza, że zgadzasz się na politykę prywatności, która wykorzystuje pliki cookies w celach statystycznych i poprawnego działania serwisu. Możesz zmienić ustawienia przeglądarki dotyczące plików cookies, ale brak zmian oznacza zgodę na ich zapisywanie."
        sx={{ backgroundColor: 'var(--secondary)', maxWidth: '600px' }}
        action={
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Link href="/polityka-prywatnosci" passHref>
              <Button variant="outlined" color="inherit">
                Polityka Prywatności
              </Button>
            </Link>
            <Button variant="contained" color="primary" onClick={handleClose}>
              ZAMKNIJ
            </Button>
          </Box>
        }
      ></SnackbarContent>
    </Snackbar>
  );
};

export default CookieConsentAlert;
