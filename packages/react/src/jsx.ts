import { REACT_ELEMENT_TYPE } from '@reactYedi/shared/ReactSymbol';
import {
  Key,
  Type,
  Props,
  Ref,
  ReactElement,
  ElementType,
} from '@reactYedi/shared/ReactTypes';

export const ReactElements = function (
  key: Key,
  type: Type,
  props: Props,
  ref: Ref
) {
  const element: ReactElement = {
    key: key,
    type,
    props,
    ref,
    $$typeof: REACT_ELEMENT_TYPE,
    __mark: 'YEDI',
  };
  return element;
};

/**
 * 实现被babel调用的jsx转换方法
 * import { jsx as _jsx } from "react/jsx-runtime";
 * _jsx("div", {
 *   children: "123"
 * });
 */
export const jsx = function (
  type: ElementType,
  config: any,
  ...maybeChildren: any
) {
  let key: Key = null;
  let ref: Ref = null;
  const props: Props = {};

  for (const prop in config) {
    const val = config[prop];

    if (prop === 'key') {
      if (val !== undefined) {
        key = `${val}`;
      }
      continue;
    }

    if (prop === 'ref') {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }

    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }
  const maybeChildrenLength = maybeChildren.length;
  if (maybeChildrenLength) {
    if (maybeChildrenLength === 1) {
      props.children = [maybeChildren];
    } else {
      props.children = maybeChildren;
    }
  }

  return ReactElements(key, type, props, ref);
};

export const createReactElement = function (
  type: ElementType,
  config: any,
  maybeKey: any
) {
  let key: Key = null;
  let ref: Ref = null;
  const props: Props = {};

  if (maybeKey !== undefined) {
    key = `${maybeKey}`;
  }

  for (const prop in config) {
    const val = config[prop];

    if (prop === 'key') {
      if (val !== undefined) {
        key = `${val}`;
      }
      continue;
    }

    if (prop === 'ref') {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }

    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }
  return ReactElements(key, type, props, ref);
};
