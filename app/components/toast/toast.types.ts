export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message: string;
  duration: number;
  leaving: boolean;
}

export interface ToastOptions {
  title?: string;
  duration?: number;
}

export interface ToastContextValue {
  addToast: (
    type: ToastType,
    message: string,
    options?: ToastOptions,
  ) => number;
  removeToast: (id: number) => void;
}
