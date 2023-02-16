import { Box, Typography, BoxProps } from '@mui/material';
import styles from './FooterCard.module.css';
interface Props extends BoxProps {
  children: React.ReactNode;
  title: string;
}

const FooterCard = ({ children, title, ...rest }: Props) => {
  return (
    <Box className={styles.card} {...rest}>
      <Typography fontSize={'20px'} fontWeight="bold">
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default FooterCard;
