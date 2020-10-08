import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { useTranslation } from '../../utils/i18next';
import { Layout, Nav, NavItem, Typography } from '../ui';

type ContentInfoProps = JSX.IntrinsicElements['footer'];

export const ContentInfo = ({ ref: _ref }: ContentInfoProps) => {
  const { t } = useTranslation();

  const navItems: NavItem[] = [
    {
      href: 'mailto:n33t5hin@gmail.com',
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      children: t('content-info.email', 'Contact'),
    },
    {
      href: 'https://github.com/visible/visible',
      icon: <FontAwesomeIcon icon={faGithub} />,
      children: t('content-info.github', 'GitHub'),
    },
    {
      href: 'https://twitter.com/visible_hq',
      icon: <FontAwesomeIcon icon={faTwitter} />,
      children: t('content-info.twitter', 'Twitter'),
    },
  ];

  return (
    <Layout.Footer ref={_ref}>
      <Layout.Container>
        <div className="space-y-4">
          <div className="flex justify-between">
            <Nav
              aria-label={t(
                'content-info.description',
                'Contact information and links to external websites',
              )}
              items={navItems}
            />
          </div>

          <Typography variant="p" fontSize="sm" color="wash">
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

          <Typography variant="p" fontSize="sm" color="wash">
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

          <Typography variant="p" fontSize="sm" color="wash">
            Copyright 2020 Ryo Igarashi, All rights reserved.
          </Typography>
        </div>
      </Layout.Container>
    </Layout.Footer>
  );
};
