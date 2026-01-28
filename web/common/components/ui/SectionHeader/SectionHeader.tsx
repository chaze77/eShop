import React from 'react';
import Link from 'next/link';
import Title from '../Title/Title';
import CustomButton from '../CustomButton';
import { BUTTON_TYPE } from '@/common/types';

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
};

export default function SectionHeader({
  title,
  actionLabel,
  actionHref,
  onAction,
  className,
}: SectionHeaderProps) {
  const action =
    actionLabel && actionHref ? (
      <Link href={actionHref}>
        <CustomButton
          variant={BUTTON_TYPE.SECOND}
          text={actionLabel}
        />
      </Link>
    ) : actionLabel ? (
      <CustomButton
        variant={BUTTON_TYPE.SECOND}
        text={actionLabel}
        onClick={onAction}
      />
    ) : null;

  return (
    <div className={className}>
      <Title text={title} />
      {action}
    </div>
  );
}
