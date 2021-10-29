import classNames from 'classnames';

export const bem = (block: string) => {
  function buildBlock(modifiers?: Record<string, any>, mixin?: string): string {
    const result = {} as Record<string, boolean>;
    if (modifiers) {
      for (let modifier of Object.keys(modifiers)) {
        result[`${block}-${modifier}`] = modifiers[modifier];
      }
    }
    return classNames(block, mixin, result);
  }

  buildBlock.element = function (
    element: string,
    modifiers?: Record<string, any>,
    mixin?: string,
  ): string {
    const result = {} as Record<string, boolean>;
    if (modifiers) {
      for (let modifier of Object.keys(modifiers)) {
        result[`${block}-${element}-${modifier}`] = modifiers[modifier];
      }
    }
    return classNames(`${block}-${element}`, mixin, result);
  };

  return buildBlock;
};
