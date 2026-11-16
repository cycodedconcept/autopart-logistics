import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// False during server rendering and hydration, true once running in the browser.
// Use it before reading browser-only state such as the persisted auth session.
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
