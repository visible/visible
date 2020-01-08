/* eslint-disable */
// @ts-ignore
import { mockAudit } from '../fetch-plugin';
import { runRule } from '../run-rule';

const reportFixture = {
  type: 'img-alt',
  level: 'error',
  rule: 'img-alt/no-alt',
};

jest.mock('../fetch-plugin');
(mockAudit as jest.Mock).mockImplementation(() => [reportFixture]);

describe('runRule', () => {
  it('finds rules from window, and run', async () => {
    const report = await runRule(['foo']);
    expect(report).toEqual([reportFixture]);
  });
});
