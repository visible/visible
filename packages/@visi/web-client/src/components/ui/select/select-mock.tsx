import classNames from 'classnames';
import React, { useState } from 'react';

import { useTranslation } from '../../../utils/i18next';

export interface SelectMockProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  onOpen?(): void;
  onClose?(): void;
}

export const SelectMock = ({
  children,
  icon,
  onOpen,
  onClose,
}: SelectMockProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (open) {
      onClose?.();
    } else {
      onOpen?.();
    }

    setOpen(!open);
  };

  return (
    <details className="relative" open={open}>
      <summary
        className={classNames(
          'block',
          'text-sm',
          'border',
          'border-gray-400',
          'rounded',
          'text-gray-700',
          'py-1',
          'px-3',
          'w-24',
          'hover:bg-gray-100',
          'active:bg-gray-200',
          'transition-all',
          'duration-75',
          'ease-in',
          'text-left',
          'cursor-pointer',
          'truncate',
          'select-none',
        )}
        onClick={handleClick}
      >
        {icon && <span className="mr-1 text-xs text-gray-500">{icon}</span>}
        <span>{children}</span>
      </summary>

      <div className="absolute border border-gray-400 bg-white p-2 shadow z-10">
        {t('select.placeholder', 'This feature not implemented yet')}
      </div>
    </details>
  );
};
