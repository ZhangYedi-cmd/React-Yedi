import { FiberNode } from './fiber';
import { beginWork } from '@/react-reconciler/src/beginWork';
import { completeWork } from '@/react-reconciler/src/completeWork';

let workInProgress: FiberNode | null = null;

function prepareWorkInLoop(fiberNode: FiberNode) {
  workInProgress = fiberNode;
}

/**
 * 渲染整个Fiber树
 * @param root
 */
function renderRoot(root: FiberNode) {
  prepareWorkInLoop(root);

  do {
    try {
      workInLoop();
      break;
    } catch (e) {
      console.error(e);
      workInProgress = null;
    }
  } while (workInProgress !== null);

  return root;
}

/**
 * 主循环: 只要 workInProgress 存在就一直遍历
 * 遍历的整体逻辑：
 * * 有子节点，就遍历子节点
 * * 没有子节点就遍历兄弟节点
 */
function workInLoop() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

/**
 * 遍历子节点
 */
function performUnitOfWork(fiber: FiberNode) {
  const next = beginWork(fiber);
  fiber.pendingProps = fiber.memoizedProps;
  // 没有子Fiber 说明走到头了
  if (next === null) {
    completeUnitOfWork(fiber);
  } else {
    workInProgress = next;
  }
}

/**
 * 遍历兄弟节点
 * @param fiber
 */
function completeUnitOfWork(fiber: FiberNode) {
  let node = fiber;
  do {
    completeWork(node);
    const sibling = node.sibling;

    // 有兄弟节点就遍历兄弟节点
    if (sibling !== null) {
      workInProgress = sibling;
      return;
    }
    node = node.return;
    workInProgress = node;
  } while (node !== null);
}
