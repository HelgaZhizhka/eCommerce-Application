import React from 'react';
import classNames from 'classnames';
import { Typography, Container } from '@mui/material';
import { LogoVariant } from '../Logo/Logo.enum';
import { Logo } from '../Logo';
import styles from './Footer.module.scss';
import { Icon } from '../baseComponents/Icon';
import { IconName } from '../baseComponents/Icon/Icon.enum';

const Copyright: React.FC = () => (
  <Typography variant="body2" align="center">
    {'Copyright © '}
    {new Date().getFullYear()}.
  </Typography>
);

const Footer: React.FC = () => (
  <footer className={classNames(styles.root)}>
    <Container maxWidth="lg">
      <Logo variant={LogoVariant.WHITE} />
      <Icon name={IconName.PHONE} />
      <Copyright />
    </Container>
  </footer>
);

export default Footer;
