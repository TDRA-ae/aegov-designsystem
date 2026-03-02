import type { ToastVariant, ToastAppearance, ToastPosition, ToastMode } from '../utils/types';

export interface ShowToastOptions {
  message: string;
  variant?: ToastVariant;
  appearance?: ToastAppearance;
  position?: ToastPosition;
  duration?: number;
  dismissible?: boolean;
  mode?: ToastMode;
  showIcon?: boolean;
  showProgress?: boolean;
}

function showToast(options: ShowToastOptions): HTMLAegovToastElement {
  const toast = document.createElement('aegov-toast') as HTMLAegovToastElement;
  if (options.variant) toast.variant = options.variant;
  if (options.appearance) toast.appearance = options.appearance;
  if (options.position) toast.position = options.position;
  if (options.duration !== undefined) toast.duration = options.duration;
  if (options.dismissible !== undefined) toast.dismissible = options.dismissible;
  if (options.mode) toast.mode = options.mode;
  if (options.showIcon !== undefined) toast.showIcon = options.showIcon;
  if (options.showProgress !== undefined) toast.showProgress = options.showProgress;
  toast.innerHTML = options.message;
  document.body.appendChild(toast);
  toast.show();
  return toast;
}

if (typeof window !== 'undefined') {
  (window as any).aegovToast = { show: showToast };
}
