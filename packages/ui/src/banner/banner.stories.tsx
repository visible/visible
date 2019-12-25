import React from 'react';
import { storiesOf } from '@storybook/react';
import { Banner } from '.';

storiesOf('Banner', module).add('Normal', () => <Banner>Visible</Banner>);
