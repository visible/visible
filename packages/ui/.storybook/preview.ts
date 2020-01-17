import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { withTheme } from '../src/with-theme';

addDecorator(withInfo({ inline: true }));
addDecorator(withKnobs);
addDecorator(withTheme);
