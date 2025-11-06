// Lightweight toast state for Radix Toast (shadcn/ui) - pure JS version
import { useEffect, useState } from "react";

let count = 0;
const genId = () => (++count).toString();

const listeners = [];
const state = {
  toasts: [],
};

function notify() {
  for (const l of listeners) l(state);
}

function add(toast) {
  const t = { id: genId(), open: true, ...toast };
  state.toasts = [...state.toasts, t];
  notify();
  return t.id;
}

function update(toastId, update) {
  state.toasts = state.toasts.map((t) => (t.id === toastId ? { ...t, ...update } : t));
  notify();
}

function remove(toastId) {
  state.toasts = state.toasts.filter((t) => t.id !== toastId);
  notify();
}

function dismiss(toastId) {
  if (toastId) {
    update(toastId, { open: false });
    // remove after exit animation (~1s)
    setTimeout(() => remove(toastId), 1000);
  } else {
    state.toasts.forEach((t) => dismiss(t.id));
  }
}

function toast(props) {
  return add(props);
}

function useToast() {
  const [data, setData] = useState(state);
  useEffect(() => {
    listeners.push(setData);
    return () => {
      const i = listeners.indexOf(setData);
      if (i > -1) listeners.splice(i, 1);
    };
  }, []);

  return {
    ...data,
    toast,
    dismiss,
  };
}

export { useToast, toast };