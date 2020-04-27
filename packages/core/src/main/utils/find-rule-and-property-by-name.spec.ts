import { Protocol } from 'devtools-protocol/types/protocol';

import matchedStyles from '../../__fixtures__/matched-styles.json';
import { client, send as sendMock } from '../../__mocks__/cdp';
import { findRuleAndPropertyByName } from './find-rule-and-property-by-name';

describe('findRuleAndPropertyByName', () => {
  beforeAll(() => {
    sendMock.mockResolvedValue(matchedStyles);
  });

  it('finds the rule and the property by its name', async () => {
    const node = ({} as unknown) as Protocol.DOM.Node;
    const result = await findRuleAndPropertyByName(client, 'color', node);
    const { style, property } = result;

    expect(property.value).toBe('white');
    expect(style.styleSheetId).toBe('13502.0');
  });
});
