import React from 'react';
import classNames from 'classnames';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import styles from './footer.module.scss';

const Copyright: React.FC = () => (
  <Typography variant="body2" color="text.secondary" align="center">
    {'Copyright © '}
    {new Date().getFullYear()}.
  </Typography>
);

const Footer: React.FC = () => (
  <div className={classNames(styles.root)}>
    <Container maxWidth="lg">
      <h1>Footer</h1>
      <Copyright />
    </Container>
  </div>
);

export default Footer;
