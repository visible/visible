import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withTheme } from '../src/with-theme';

addDecorator(withKnobs);
addDecorator(withTheme);
