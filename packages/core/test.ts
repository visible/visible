/* eslint-disable */
import { Visible } from './src/main';
import { filter, last, flatMap, finalize } from 'rxjs/operators';

(async () => {
  const visible = await Visible.init(
    {
      extends: [],
      plugins: ['@visi/plugin-standard'],
      settings: {
        headless: true,
      },
    },
  );

  await visible.open('https://djmnj.csb.app/');
  const diagnosis$ = visible.diagnose();

  diagnosis$.subscribe(report => {
    console.log(JSON.stringify(report, undefined, 2));
  })

  // visible.done$.subscribe(map => console.log(map));
})();
