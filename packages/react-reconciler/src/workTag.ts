export type WorkTag =
  | typeof FunctionComponents
  | typeof ClassComponent
  | typeof IndeterminateComponent
  | typeof HostRoot
  | typeof HostComponent
  | typeof HostText;

// 函数组件
export const FunctionComponents = 0;
// 类组件
export const ClassComponent = 1;
// 待确定类型（首次渲染时）
export const IndeterminateComponent = 2;
// 根节点 如React.render(div) 这里的DIV就是HostRoot
export const HostRoot = 3;
// 原生DOM元素,如DIV、SPAN 等元素
export const HostComponent = 5;
// 文本节点
export const HostText = 6;
