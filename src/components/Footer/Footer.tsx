import React from 'react';
import classNames from 'classnames';
import { Typography, Box, Container } from '@mui/material';
import { LogoVariant } from '../Logo/logo.enum';
import { Logo } from '../Logo';
import styles from './footer.module.scss';

const Copyright: React.FC = () => (
  <Typography variant="body2" align="center">
    {'Copyright © '}
    {new Date().getFullYear()}.
  </Typography>
);

const Footer: React.FC = () => (
  <Box component="footer" className={classNames(styles.root)}>
    <Container maxWidth="lg">
      <Logo variant={LogoVariant.WHITE} />
      <Copyright />
    </Container>
  </Box>
);

export default Footer;
