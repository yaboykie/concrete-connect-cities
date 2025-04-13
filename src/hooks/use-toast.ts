
import { useState } from "react";
import { toast as sonnerToast, type ToastT } from "sonner";

export type Toast = ToastT;

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (props: Toast) => {
    const id = sonnerToast(props);
    setToasts((prevToasts) => [...prevToasts, { ...props, id }]);
  };

  const dismiss = (toastId?: string) => {
    if (toastId) {
      sonnerToast.dismiss(toastId);
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== toastId)
      );
    } else {
      sonnerToast.dismiss();
      setToasts([]);
    }
  };

  return {
    toast,
    dismiss,
    toasts,
  };
};

export { toast } from "sonner";
