/* eslint-disable */
import { Visible } from './src/visible';
import path from 'path';
import postcss from 'postcss';
import diff from 'cli-diff';
import { getOuterHTML } from 'domutils';

(async () => {
  const visible = await Visible.init({
    driver: '@visi/plugin-puppeteer',
    extends: [],
    plugins: [
      '@visi/plugin-puppeteer',
      '@visi/plugin-standard',
    ],
    // settings: {
    //   headless: false,
    // },
  });

  const result = await visible.diagnose('https://djmnj.csb.app/');
  console.log(result);
})();
