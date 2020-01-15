import { addDecorator } from '@storybook/react';
// @ts-ignore
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { withTheme } from './with-theme';

addDecorator(withInfo({ inline: true }));
addDecorator(withKnobs);
addDecorator(withTheme);
