import { Badge, Typography } from '@visi/web-ui';
import React from 'react';
import styled from 'styled-components';

import { Outcome, ReportLargeFragment } from '../../generated/graphql';
import { useTranslation } from '../../utils/i18next';
import { Image } from '../image';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  padding: 18px 12px;

  ${Image} {
    margin-right: 18px;
  }
`;

const Content = styled.div`
  ${Badge} {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    height: min-content;
    margin: auto 12px auto 0;
  }
`;

export interface ReportProps {
  report: ReportLargeFragment;
}

export const Report = ({ report }: ReportProps) => {
  const { t } = useTranslation();
  const variant =
    report.outcome === Outcome.Passed
      ? 'green'
      : report.outcome === Outcome.Fail
      ? 'red'
      : 'grey';

  // やめたほうがいい
  const [pointer] = report.pointers ?? [];

  return (
    <Wrapper>
      {pointer?.screenshot && (
        <Image src={pointer.screenshot} alt={pointer.xpath} size={80} />
      )}

      <Content>
        <Badge variant={variant}>{report.outcome}</Badge>
        <Typography variant="h4" textTransform="uppercase">
          {report.rule.name}
        </Typography>

        <Typography
          variant="body"
          fontStyle={report.message == null ? 'italic' : 'normal'}
        >
          {report.message ?? 'No message'}
        </Typography>

        <Typography variant="body" color="wash" fontStyle="italic">
          {t('report.location', {
            defaultValue: 'Reported from {{fileName}}:{{startLine}}',
            fileName: pointer?.source?.url ?? 'Unknown file',
            startLine: pointer?.location?.startLine ?? '0',
          })}
        </Typography>
      </Content>
    </Wrapper>
  );
};
