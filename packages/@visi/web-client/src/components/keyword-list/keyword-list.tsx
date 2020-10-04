import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import { useTranslation } from '../../utils/i18next';
import { Tag } from '../ui';

const KeywordPlaceholder = () => {
  return (
    <div
      aria-hidden
      className="bg-gray-300 rounded w-20 h-4 mb-2 mr-2 animate-pulse"
    />
  );
};

export interface KeywordListProps {
  keywords: string[];
  wrap?: boolean;
  loading: boolean;
}

export const KeywordList = ({ keywords, wrap, loading }: KeywordListProps) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex flex-wrap">
        {Array.from({ length: 8 }, (_, i) => (
          <KeywordPlaceholder key={`item-${i}`} />
        ))}
      </div>
    );
  }

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

KeywordList.defaultProps = {
  loading: false,
};
