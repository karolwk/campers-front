import React from 'react';

import { Button, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import RedditIcon from '@mui/icons-material/Reddit';
import FileCopyIcon from '@mui/icons-material/FileCopy';

type Props = {
  url: string;
  text?: string;
};

const ShareIcons: React.FC<Props> = ({ url, text }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <>
      <IconButton
        aria-label="Facebook"
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener"
      >
        <FacebookIcon />
      </IconButton>
      <IconButton
        aria-label="Twitter"
        href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
        target="_blank"
        rel="noopener"
      >
        <TwitterIcon />
      </IconButton>
      <IconButton
        aria-label="WhatsApp"
        href={`whatsapp://send?text=${text ? text + ' - ' : ''}${url}`}
        target="_blank"
        rel="noopener"
      >
        <WhatsAppIcon />
      </IconButton>
      <IconButton
        aria-label="Reddit"
        href={`http://www.reddit.com/submit?url=${url}`}
        target="_blank"
        rel="noopener"
      >
        <RedditIcon />
      </IconButton>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        sx={{ textTransform: 'none', marginRight: '8px' }}
        onClick={handleCopyLink}
      >
        <FileCopyIcon style={{ marginRight: '8px' }} />
        Kopiuj link do schowka
      </Button>
    </>
  );
};

export default ShareIcons;
