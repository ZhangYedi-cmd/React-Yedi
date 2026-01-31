import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbol';
import {
  Key,
  Type,
  Props,
  Ref,
  ReactElementType,
  ElementType,
} from 'shared/ReactTypes';

export const ReactElement = function (
  key: Key,
  type: Type,
  props: Props,
  ref: Ref
) {
  const element: ReactElementType = {
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

  return ReactElement(key, type, props, ref);
};

export const jsxDEV = function (type: ElementType, config: any) {
  console.log(type, config);
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
  return ReactElement(key, type, props, ref);
};

/**
 * 实现被babel调用的jsx转换方法
 * import { jsx as _jsx } from "react/jsx-runtime";
 * _jsx("div", {
 *   children: "123"
 * });
 */
export const createElement = function (
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
  return ReactElement(key, type, props, ref);
};
