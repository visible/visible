import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import { useTranslation } from '../../utils/i18next';
import { Tag } from '../ui';

export interface KeywordListProps {
  keywords: string[];
  wrap?: boolean;
}

export const KeywordList = (props: KeywordListProps) => {
  const { t } = useTranslation();
  const { keywords, wrap } = props;

  return (
    <ul className={classNames('inline-flex', wrap && 'flex-wrap')}>
      {keywords.map((keyword, i) => (
        <li key={`${keyword}-${i}`} className={classNames('mb-2', 'mr-2')}>
          <Link as={`/keywords/${keyword}`} href="/keywords/[id]">
            <a className="hover:opacity-75">
              <Tag>{t(`keywords.${keyword}`)}</Tag>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
