export function convertPXToREM(px) {
  return Math.round(px / 48 * 100) / 100;
}

export function getInlineStyle(styleObject) {
  return Object.entries(styleObject).reduce((acc, [key, value]) => {
    return acc + `${key}:${value};`;
  }, '');
}