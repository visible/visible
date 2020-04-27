import { Protocol } from 'devtools-protocol/types/protocol';
import { CDPSession } from 'puppeteer';

const findPropertyInStyle = (
  style: Protocol.CSS.CSSStyle,
  propertyName: string,
) => {
  return style.cssProperties
    .filter(property => !property.disabled && !property.implicit)
    .find(property => property.name === propertyName);
};

const flattenStylesFromMatchedStyles = (
  matched: Protocol.CSS.GetMatchedStylesForNodeResponse,
): Protocol.CSS.CSSStyle[] => {
  const {
    inlineStyle,
    attributesStyle,
    matchedCSSRules = [],
    inherited = [],
  } = matched;

  const a = matchedCSSRules
    .filter(ruleMatch => ruleMatch.rule.origin === 'regular')
    .map(ruleMatch => ruleMatch.rule.style);

  const b = inherited.flatMap(rule =>
    rule.matchedCSSRules
      .filter(ruleMatch => ruleMatch.rule.origin === 'regular')
      .map(ruleMatch => ruleMatch.rule.style),
  );

  return [inlineStyle, attributesStyle, a, b]
    .flat()
    .filter((style): style is Protocol.CSS.CSSStyle => style != null);
};

export const findRuleAndPropertyByName = async (
  client: CDPSession,
  propertyName: string,
  node: Protocol.DOM.Node,
) => {
  const matchedStyles = await client.send('CSS.getMatchedStylesForNode', {
    nodeId: node.nodeId,
  });

  const styles = flattenStylesFromMatchedStyles(matchedStyles);

  // Find style such that propertyName can be found
  const matchedStyle = styles.find(
    style => findPropertyInStyle(style, propertyName) != null,
  );

  if (matchedStyle == null) {
    throw new Error(`No matched rule has property ${propertyName}`);
  }

  // TODO: call `findPropertyInRule` just once
  const property = findPropertyInStyle(matchedStyle, propertyName);

  if (property == null) {
    throw new Error(`Rule has no property ${propertyName}`);
  }

  return { style: matchedStyle, property };
};
