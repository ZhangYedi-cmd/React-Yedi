import { WorkTag } from '@/react-reconciler/src/workTag';
import { Key, Props, Ref } from '@/shared/ReactTypes';
import { Flags, NoFlags } from '@/react-reconciler/src/fiberFlags';

export class FiberNode {
  // === 节点标识 ===
  tag: WorkTag; // 节点类型 (FunctionComponent,HostComponent 等)
  key: null | string; // React key
  type: any; // 组件类型 (函数名、类名或 tagName)

  // === 状态关联 ===
  stateNode: any; // 关联的 DOM 节点或类组件实例
  memoizedProps: any; // 上次渲染的 props
  memoizedState: any; // 上次渲染的 state
  pendingProps: any; // 新的 props（待应用）
  pendingQueue: any; // 待处理的更新队列

  // === 树结构 ===
  return: FiberNode | null; // 父节点
  child: FiberNode | null; // 第一个子节点
  sibling: FiberNode | null; // 下一个兄弟节点
  index = 0; // 在父节点中的索引

  // === 引用 ===
  ref: Ref | null; // DOM 引用或 callback ref

  // === 副作用 ===
  flags: Flags; // 副作用标记 (Placement, Update,Deletion 等)
  subtreeFlags: Flags; // 子树副作用汇总

  // === 调度相关 ===
  alternate: FiberNode | null; // 双缓冲：另一棵树的对应节点

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    this.tag = tag;
    this.key = key;
    this.return = null;
    this.child = null;
    this.sibling = null;

    this.pendingProps = pendingProps;
    this.memoizedProps = null;

    this.alternate = null;
    this.flags = NoFlags;
  }
}
