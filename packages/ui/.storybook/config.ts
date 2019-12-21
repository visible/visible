import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { withTheme } from './with-theme';

addDecorator(withInfo({ inline: true }));
addDecorator(withKnobs);
addDecorator(withTheme);

configure(require.context('../src', true, /\.stories\.tsx$/), module);
