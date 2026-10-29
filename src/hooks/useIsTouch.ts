"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(hover: none), (pointer: coarse)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/**
 * `true` on touch / coarse-pointer devices. SSR default is `true` so heavy
 * pointer effects (parallax, tilt, magnetic, cursor) only enable after hydration
 * on real fine-pointer devices.
 */
export function useIsTouch() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => true,
  );
}

export function isTouchDevice() {
  return typeof window !== "undefined" && window.matchMedia(QUERY).matches;
}

