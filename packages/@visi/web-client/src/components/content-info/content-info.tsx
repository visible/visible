import React from 'react';

import { useTranslation } from '../../utils/i18next';
import { Layout, NavItem, Typography } from '../ui';

type NavColumnProps = {
  title: string;
  items: NavItem[];
};

const NavColumn = ({ title, items }: NavColumnProps) => {
  return (
    <div>
      <Typography variant="h4" fontSize="base" color="wash" className="mb-2">
        {title}
      </Typography>
      <ul className="space-y-1">
        {items.map((navItem, i) => (
          <li key={`item-${i}`}>
            <a
              href={navItem.href}
              target="_blank"
              rel="noreferrer"
              className="hover:underline text-gray-600"
            >
              {navItem.children}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Nav = ({ columns }: { columns: NavColumnProps[] }) => {
  return (
    <div className="flex flex-col space-y-2 md:flex-row md:space-x-12 md:space-y-0">
      {columns.map((column, i) => (
        <NavColumn key={`item-${i}`} {...column} />
      ))}
    </div>
  );
};

const Copyright = () => {
  return (
    <div className="flex justify-between space-x-24">
      <div>
        <Typography fontSize="sm" color="wash">
          Copyright 2020 Ryō Igarashi
          <br />
          Distributed under GNU Affero General Public License
        </Typography>
      </div>

      <div>
        <Typography fontSize="sm" color="wash">
          <span>
            Photo by{' '}
            <a href="https://unsplash.com/@sctgrhm?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
              Scott Graham
            </a>{' '}
            on{' '}
            <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
              Unsplash
            </a>
          </span>
        </Typography>

        <Typography fontSize="sm" color="wash">
          Icons made by{' '}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            {' '}
            www.flaticon.com
          </a>
        </Typography>
      </div>
    </div>
  );
};

type ContentInfoProps = JSX.IntrinsicElements['footer'];

export const ContentInfo = ({ ref: _ref }: ContentInfoProps) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('content-info.contact.title', 'Contact'),
      items: [
        {
          href: 'mailto:n33t5hin@gmail.com',
          children: t('content-info.contact.email', 'Email'),
        },
        {
          href: 'https://twitter.com/visible_hq',
          children: t('content-info.contact.twitter', 'Twitter'),
        },
        {
          href: 'https://github.com/visible/visible/issues/news',
          children: t('content-info.contact.github-issues', 'Report Bugs'),
        },
      ],
    },
    {
      title: t('content-info.resources.title', 'Resources'),
      items: [
        {
          href: 'https://github.com/visible/visible/blob/develop/docs',
          children: t('content-info.resources.docs', 'Documentation'),
        },
        {
          href: 'https://github.com/visible/visible',
          children: t('content-info.resources.github', 'GitHub'),
        },
      ],
    },
    {
      title: t('content-info.product.title', 'Product'),
      items: [
        {
          href: 'http://visi.dev',
          children: t('content-info.product.get-started', 'Get started'),
        },
        {
          href: 'http://eepurl.com/he5d7b',
          children: t('content-info.product.newsletter', 'Newsletter'),
        },
        {
          href:
            'https://github.com/visible/visible/tree/develop/packages/%40visi/web-client/public/static',
          children: t('content-info.product.press-kit', 'Press kit'),
        },
      ],
    },
  ];

  return (
    <Layout.Footer ref={_ref}>
      <Layout.Container>
        <div className="w-full space-y-8 my-6 mx-auto lg:max-w-screen-md">
          <div className="flex flex-col md:flex-row md:space-x-24 md:justify-between">
            <img src="/static/logo-gray.svg" alt="Visible" />
            <Nav columns={columns} />
          </div>
          <Copyright />
        </div>
      </Layout.Container>
    </Layout.Footer>
  );
};
