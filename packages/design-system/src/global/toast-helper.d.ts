import type { ToastVariant, ToastAppearance, ToastPosition, ToastMode } from '../utils/types';
export interface ShowToastOptions {
    message: string;
    variant?: ToastVariant;
    appearance?: ToastAppearance;
    position?: ToastPosition;
    duration?: number;
    isDismissible?: boolean;
    mode?: ToastMode;
    isProgressEnabled?: boolean;
}
