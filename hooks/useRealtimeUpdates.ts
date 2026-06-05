"use client";

import { useState, useEffect } from "react";

type UpdateCallback = () => void;

const listeners = new Set<UpdateCallback>();
let intervalId: ReturnType<typeof setInterval> | null = null;
const POLL_INTERVAL = 8000;

function startPolling() {
  if (intervalId) return;
  intervalId = setInterval(() => {
    listeners.forEach((cb) => cb());
  }, POLL_INTERVAL);
}

function stopPolling() {
  if (intervalId && listeners.size === 0) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

let revision = 0;

export function useRealtimeUpdates() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const cb = () => {
      revision++;
      setTick((t) => t + 1);
    };
    listeners.add(cb);
    startPolling();
    return () => {
      listeners.delete(cb);
      stopPolling();
    };
  }, []);

  return tick;
}

export function getRevision() {
  return revision;
}
