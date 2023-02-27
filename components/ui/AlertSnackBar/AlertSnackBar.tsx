import { Alert, Snackbar, SnackbarProps, Typography } from '@mui/material';
import React from 'react';

type Props = {
  onClose: () => void;
  errTitle?: string;
  errMsg?: string | null;
  successMsg: string;
} & SnackbarProps;

const AlertSnackBar = ({
  errMsg,
  errTitle = 'There was an error',
  successMsg,
  onClose,
  ...rest
}: Props) => {
  return (
    <Snackbar onClose={onClose} {...rest}>
      <Alert
        onClose={onClose}
        severity={errMsg ? 'error' : 'success'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {errMsg ? (
          <>
            <Typography>{errTitle}</Typography>
            <pre>{errMsg}</pre>
          </>
        ) : (
          <Typography>{successMsg}</Typography>
        )}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackBar;
