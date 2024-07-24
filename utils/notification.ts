import { toast } from "react-toastify";
import { MdErrorOutline } from "react-icons/md";

export function notify(msg: string, type: "success" | "error" = "success") {
    toast(msg, {
        type: type === "success" ? "default" : "error",
        position: "bottom-center",
        hideProgressBar: true,
        closeButton: false,
        theme: "dark",
        className: "py-1"
      })
}