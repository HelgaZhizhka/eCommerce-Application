import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { RoutePaths } from '../../routes/routes.enum';
import { contacts } from '../../constants';
import { Icon } from '../baseComponents/Icon';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { PhoneNumber } from '../baseComponents/PhoneNumber';
import { Categories } from '../Categories';
import { LogoVariant } from '../Logo/Logo.enum';
import { Logo } from '../Logo';
import styles from './Footer.module.scss';

const Footer: React.FC = () => (
  <footer className={styles.root}>
    <Container maxWidth="xl" sx={{ pb: 4 }}>
      <div className={styles.footerRow}>
        <div className={styles.footerColumn}>
          <div className={styles.logo}>
            <Logo variant={LogoVariant.WHITE} />
          </div>
          <h1 className={styles.heading}>YesCode: Merch for True Coders</h1>
        </div>
        <div className={styles.footerColumn}>
          <Typography variant="h5" component="h5" sx={{ color: 'var(--white)', fontWeight: '900', mb: '8px' }}>
            Categories
          </Typography>
          <Categories />
        </div>
        <div className={styles.footerColumn}>
          <Typography variant="h5" component="h5" sx={{ color: 'var(--white)', fontWeight: '900', mb: '8px' }}>
            Contact Us
          </Typography>
          <Link className={`link ${styles.link}`} to={RoutePaths.ABOUT}>
            About Us
          </Link>
          <List>
            <ListItem sx={{ p: 0, mb: 2 }}>
              <PhoneNumber>(+380) 68 018 45 67</PhoneNumber>
            </ListItem>
            <ListItem sx={{ p: 0, mb: 2 }}>
              <Icon name={IconName.WHATSUP} width={32} height={32} className={'icon mr-1'} />
              <span>{contacts.phone}</span>
            </ListItem>
            <ListItem sx={{ p: 0, mb: 2 }}>
              <Icon name={IconName.EMAIL} width={32} height={32} className={'icon mr-1'} />
              <a className="text-inherit" href="mailto:yescode@gmail.com">
                {contacts.email}
              </a>
            </ListItem>
          </List>
        </div>
      </div>
    </Container>
    <p className={styles.copyright}>
      {'All rights reserved. © '} {new Date().getFullYear()}.
    </p>
  </footer>
);

export default Footer;
