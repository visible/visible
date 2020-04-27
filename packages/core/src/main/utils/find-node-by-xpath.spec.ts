import document from '../../__fixtures__/document.json';
import document2 from '../../__fixtures__/test.json';
import { client, send as sendMock } from '../../__mocks__/cdp';
import { findNodeByXPath } from './find-node-by-xpath';

describe('findNodeByXPath', () => {
  beforeAll(() => {
    sendMock.mockResolvedValue({ root: document });
  });

  it('finds an element', async () => {
    const node = await findNodeByXPath(client, '/html/body/h1');
    expect(node?.nodeId).toBe(37);
  });

  it('finds a text node', async () => {
    const node = await findNodeByXPath(client, '/html/body/h1/text()');
    expect(node?.nodeId).toBe(38);
  });

  it('finds a node with [position] predicate', async () => {
    const node = await findNodeByXPath(client, '/html/head/meta[position()=2]');
    expect(node?.nodeId).toBe(29);
  });

  it('test2', async () => {
    sendMock.mockResolvedValueOnce({ root: document2 });
    const node = await findNodeByXPath(
      client,
      '/html/body/button[position()=3]',
    );

    expect(node?.nodeId).toBe(153);
  });
});
