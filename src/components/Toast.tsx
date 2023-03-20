import { Toaster, ToastOptions } from "react-hot-toast";

const toastOptions: ToastOptions = {
  style: {
    padding: "16px",
    background: "rgb(255 255 255 / 0.05)",
    color: "#FFFFFF",
  },
} as ToastOptions;

const Toast = () => {
  return <Toaster toastOptions={toastOptions} />;
};

export default Toast;
