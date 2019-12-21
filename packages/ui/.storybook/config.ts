import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withInfo({ inline: true }));
addDecorator(withKnobs);

configure(require.context('../src', true, /\.stories\.tsx$/), module);
