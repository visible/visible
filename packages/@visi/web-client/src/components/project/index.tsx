import { Typography } from '@visi/web-ui';
import React from 'react';
import { Clock, ExternalLink } from 'react-feather';
import styled from 'styled-components';

import { DiagnosisLargeFragment } from '../../generated/graphql';

/*
将来的にはProject型を受け取るやつにしたいけど、今はprojectというコンセプトが
無いので、代わりにdiagnosisを受け取る
*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 8px;
  }

  & > p {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 8px;
    }

    svg {
      margin-right: 4px;
      color: #7c7c7c;
    }

    & > time {
      line-height: 1;
    }
  }
`;

const Image = styled.img`
  flex: 0 0 auto;
  max-width: 100%;
  border: 1px solid #dddddd;
  border-radius: 8px;
`;

export interface ProjectProps {
  diagnosis: DiagnosisLargeFragment;
}

export const Project = (props: ProjectProps) => {
  const { diagnosis } = props;

  const domain = new URL(diagnosis.url).hostname;
  const createdAt = new Date(diagnosis.createdAt);

  return (
    <Wrapper>
      {diagnosis.screenshot && (
        <Image src={diagnosis.screenshot} alt={diagnosis.id} />
      )}

      <Typography variant="h1">{domain}</Typography>

      <Typography variant="body" color="wash">
        <Clock size={16} />

        <time dateTime={createdAt.toISOString()}>
          {createdAt.toLocaleString()}
        </time>
      </Typography>

      <Typography variant="body" color="wash">
        <ExternalLink size={16} />

        <a href={diagnosis.url} target="_blank" rel="noopener noreferrer">
          {diagnosis.url}
        </a>
      </Typography>
    </Wrapper>
  );
};
