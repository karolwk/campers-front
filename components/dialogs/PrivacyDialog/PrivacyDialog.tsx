import React, { memo } from 'react';
import Button from '@mui/material/Button';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Box } from '@mui/material';

type Props = {
  content: string;
  currentRef: React.Ref<HTMLSpanElement>;
  ariaTitleId: string;
  ariaDescId: string;
  handleClose: () => void;
};

const PrivacyDialog = ({
  content,
  currentRef,
  handleClose,
  ariaTitleId,
  ariaDescId,
}: Props) => {
  return (
    <>
      <DialogTitle id={ariaTitleId}>
        Polityka Prywatności i plików cookie
      </DialogTitle>
      <DialogContent dividers={true}>
        <Box id={ariaDescId} ref={currentRef} tabIndex={-1}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Zamknij</Button>
      </DialogActions>
    </>
  );
};

export default memo(PrivacyDialog);
