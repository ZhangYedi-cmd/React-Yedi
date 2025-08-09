// 对外暴露的公共类型
const isSymbol = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = isSymbol
  ? Symbol.for('react.element')
  : 0xeac7;
