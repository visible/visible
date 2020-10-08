import { number, text } from '@storybook/addon-knobs';
import React from 'react';

import { CodeFrame, DiffCodeFrame } from '.';

export default {
  title: 'CodeFrame',
  component: CodeFrame,
};

export const Normal = () => (
  <CodeFrame
    title="foo"
    highlightStart={number('start', 1)}
    highlightEnd={number('end', 2)}
    href="/test.html"
    filename="/test.html"
    value={text(
      'value',
      `import fs from 'fs';

const files = fs.readdir('.');

for (const file of files) {
  console.log(file)
}`,
    )}
  />
);

export const Diff = () => (
  <DiffCodeFrame
    title="foo"
    hunk={text(
      'hunk',
      `===================================================================
--- old
+++ new
@@ -1,4 +1,4 @@

     hello world
-    my name is john
-    nice to see you
+    my name is joseph
+    nice to see you guys`,
    )}
  />
);
