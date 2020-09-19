import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { withStyle } from '../src/tests/with-style';

addDecorator(withKnobs);
addDecorator(withStyle);
