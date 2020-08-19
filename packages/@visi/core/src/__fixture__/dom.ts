import { parseDOM } from 'htmlparser2';
export default parseDOM(`<div><p>Hello world</p></div>`, {
  withEndIndices: true,
  withStartIndices: true,
});
