import React from 'react';
import classNames from 'classnames';
import { Container } from '@mui/material';
import { Icon } from '../baseComponents/Icon';
import { IconName } from '../baseComponents/Icon/icon.enum';
import { LogoVariant } from '../Logo/logo.enum';
import { Logo } from '../Logo';
import styles from './footer.module.scss';

const Footer: React.FC = () => (
  <footer className={classNames(styles.root)}>
    <Container maxWidth="lg" sx={{ pb: 2 }}>
      <Logo variant={LogoVariant.WHITE} />
      <Icon name={IconName.PHONE} />
    </Container>
    <p className={classNames(styles.copyright)}>
      {'All rights reserved. © '} {new Date().getFullYear()}.
    </p>
  </footer>
);

export default Footer;
