import { Bounce, toast, ToastOptions } from "react-toastify";

const defaultToastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const showSuccessToast = (message: string) => {
  toast.success(message, defaultToastConfig);
};

export const showErrorToast = (message: string) => {
  toast.error(message, defaultToastConfig);
};