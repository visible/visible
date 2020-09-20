import { faBell, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import pkg from '../.././../package.json';
import { useTranslation } from '../../utils/i18next';
import { Image, Layout, Nav, NavItem, Typography } from '../ui';

const Logography = () => {
  return (
    <div className="flex items-center">
      <Image alt="Visible" src="/static/logo-white.png" height="30px" />

      <span
        className={classNames(
          'border',
          'rounded',
          'border-white',
          'text-xs',
          'text-white',
          'p-1',
          'font-normal',
          'ml-2',
        )}
      >
        Insider Preview - {pkg.version}
      </span>
    </div>
  );
};

export const Banner = () => {
  const { t } = useTranslation();

  const navItems: NavItem[] = [
    {
      as: '/',
      href: '/',
      children: t('banner.home', 'Home'),
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
      href: '/rules',
      as: '/rules',
      children: t('banner.rules', 'Rules'),
      icon: <FontAwesomeIcon icon={faBell} />,
    },
  ];

  return (
    <Layout.Header>
      <Layout.Container>
        <div className="flex w-full justify-between">
          <div>
            <Typography variant="h1">
              <Link href="/">
                <a>
                  <Logography />
                </a>
              </Link>
            </Typography>
          </div>

          <div>
            <Nav items={navItems} variant="invert" />
          </div>
        </div>
      </Layout.Container>
    </Layout.Header>
  );
};
