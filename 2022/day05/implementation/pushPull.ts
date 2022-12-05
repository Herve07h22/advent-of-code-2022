import { Push, PushMany, Pull, PullMany, GetTop } from "../FunctionTypes";

// Implementation

export const push: Push = (stack, crate) => [crate, ...stack];
export const pushMany: PushMany = (stack, crates) => [...crates, ...stack];
export const pushToBottom: Push = (stack = [], crate) => [...stack, crate];

export const pull: Pull = ([top, ...rest]) => [top, rest];
export const pullMany: PullMany = (stack, numberOfCrates) => [
  stack.slice(0, numberOfCrates),
  stack.slice(numberOfCrates),
];

export const getTop: GetTop = ([top, ..._]) => top;
