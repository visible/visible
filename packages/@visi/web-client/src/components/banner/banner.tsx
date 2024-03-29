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
    <div className="flex items-center space-x-3">
      <Image alt="Visible" src="/static/logo-white.png" height="30px" />

      <span
        className={classNames(
          'border',
          'rounded',
          'p-1',
          'font-mono',
          'text-xs',
          'border-white',
          'text-white',
        )}
      >
        preview - {pkg.version}
      </span>
    </div>
  );
};

export const Banner = () => {
  const { t, i18n } = useTranslation();

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

  const surveyLink =
    i18n.language === 'en'
      ? 'https://forms.gle/H72ddXy16X6KZf1T6'
      : 'https://forms.gle/SvSkkKMs1NDbm4vn9';

  return (
    <Layout.Header>
      <div className="bg-purple-700 text-white">
        <Layout.Container className="justify-center">
          <a
            href={surveyLink}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            {t(
              'survey.title',
              "📝 Answer a survey to report issues or request a feature! It's brief that takes about 3 min!",
            )}
          </a>
        </Layout.Container>
      </div>
      <Layout.Container>
        <div className="flex w-full justify-between">
          <div>
            <Typography variant="h1" fontWeight="normal">
              <Link href="/">
                <a>
                  <Logography />
                </a>
              </Link>
            </Typography>
          </div>

          <div>
            <Nav
              items={navItems}
              variant="invert"
              aria-label={t('banner.description', 'Site navigation')}
            />
          </div>
        </div>
      </Layout.Container>
    </Layout.Header>
  );
};
