/**
 * See: https://www.styled-components.com/docs/api#typescript
 */
import * as styledComponents from 'styled-components';
import { theme } from './theme';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  ThemeContext,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  typeof theme
>;

export { css, createGlobalStyle, keyframes, ThemeProvider, ThemeContext };
export default styled;
