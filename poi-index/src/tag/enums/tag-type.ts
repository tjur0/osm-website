export enum TagType {
  MAIN = 'main',
  ATTRIBUTE = 'attribute',
  FLOATING = 'floating',
}

export const stringToTagType = (value: string): TagType => {
  switch (value) {
    case 'MAIN':
      return TagType.MAIN;
    case 'ATTRIBUTE':
      return TagType.ATTRIBUTE;
    case 'FLOATING':
      return TagType.FLOATING;
    default:
      throw new Error('Invalid TagType');
  }
};
