import React from 'react';
import { Link } from 'react-router-dom';

import { RoutePaths } from '../../routes/routes.enum';
import { contacts } from '../../constants';
import { Icon } from '../baseComponents/Icon';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { PhoneNumber } from '../baseComponents/PhoneNumber';
import { Categories } from '../Categories';
import { LogoVariant } from '../Logo/Logo.enum';
import { Logo } from '../Logo';

const Footer: React.FC = () => (
  <footer className="mt-auto bg-violet text-light-white text-[20px]">
    <div className="mx-auto max-w-[1536px] px-4 pt-5 pb-8 md:pt-10">
      <div className="md:flex md:justify-between md:gap-8">
        <div className="mb-8 md:mb-0">
          <div className="mb-2.5 block md:mb-9">
            <Logo variant={LogoVariant.WHITE} />
          </div>
          <h1 className="text-2xl font-black text-white">YesCode: Merch for True Coders</h1>
        </div>

        <div className="mb-8 md:mb-0">
          <h5 className="mb-2 text-2xl font-black text-white">Categories</h5>
          <Categories />
        </div>

        <div>
          <h5 className="mb-2 text-2xl font-black text-white">Contact Us</h5>
          <Link className="link text-light-white transition-transform hover:text-white" to={RoutePaths.ABOUT}>
            About Us
          </Link>
          <ul className="mt-2 flex flex-col gap-4">
            <li>
              <PhoneNumber>(+380) 68 018 45 67</PhoneNumber>
            </li>
            <li className="flex items-center">
              <Icon name={IconName.WHATSUP} width={32} height={32} className="icon mr-1" />
              <span>{contacts.phone}</span>
            </li>
            <li className="flex items-center">
              <Icon name={IconName.EMAIL} width={32} height={32} className="icon mr-1" />
              <a className="text-inherit" href="mailto:yescode@gmail.com">
                {contacts.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <p className="m-0 bg-black py-3 text-center text-[80%]">
      {'All rights reserved. © '} {new Date().getFullYear()}.
    </p>
  </footer>
);

export default Footer;
