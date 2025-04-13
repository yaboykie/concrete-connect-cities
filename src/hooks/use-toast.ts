
import { useState } from "react";
import { toast as sonnerToast, type Toast as SonnerToast } from "sonner";

export type Toast = SonnerToast;

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
  duration?: number;
  action?: React.ReactNode;
};

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (props: ToastProps) => {
    // Convert our props format to sonner format
    const { title, description, variant, ...rest } = props;
    
    // Use the appropriate sonner method based on variant
    let id: string;
    if (variant === "destructive") {
      id = sonnerToast.error(title || "", {
        description,
        ...rest
      });
    } else if (variant === "success") {
      id = sonnerToast.success(title || "", {
        description,
        ...rest
      });
    } else {
      id = sonnerToast(title || "", {
        description,
        ...rest
      });
    }
    
    setToasts((prevToasts) => [...prevToasts, { id, ...props } as unknown as Toast]);
    return id;
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

// Export the sonner toast directly for simple use cases
export { toast } from "sonner";
