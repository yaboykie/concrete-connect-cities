
import { useState } from "react";
import { toast as sonnerToast } from "sonner";

// Define our toast types
export interface Toast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success";
  duration?: number;
}

type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
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
      id = String(sonnerToast.error(title || "", {
        description,
        ...rest
      }));
    } else if (variant === "success") {
      id = String(sonnerToast.success(title || "", {
        description,
        ...rest
      }));
    } else {
      id = String(sonnerToast(title || "", {
        description,
        ...rest
      }));
    }
    
    setToasts((prevToasts) => [...prevToasts, { id, title, description, variant, ...rest }]);
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
