import toast from "react-hot-toast";

// Custom toast functions with project theme
export const showToast = {
   success: (message: string) => {
      return toast.success(message, {
         style: {
            background: "#1e293b", // slate-800
            color: "#f8fafc", // slate-50
            border: "1px solid #10b981", // emerald-500
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
         },
         iconTheme: {
            primary: "#10b981", // emerald-500
            secondary: "#f8fafc",
         },
         duration: 4000,
      });
   },

   error: (message: string) => {
      return toast.error(message, {
         style: {
            background: "#1e293b", // slate-800
            color: "#f8fafc", // slate-50
            border: "1px solid #ef4444", // red-500
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
         },
         iconTheme: {
            primary: "#ef4444", // red-500
            secondary: "#f8fafc",
         },
         duration: 5000,
      });
   },

   loading: (message: string) => {
      return toast.loading(message, {
         style: {
            background: "#1e293b", // slate-800
            color: "#f8fafc", // slate-50
            border: "1px solid #6b7280", // gray-500
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
         },
         iconTheme: {
            primary: "#10b981", // emerald-500
            secondary: "#f8fafc",
         },
      });
   },

   info: (message: string) => {
      return toast(message, {
         icon: "ℹ️",
         style: {
            background: "#1e293b", // slate-800
            color: "#f8fafc", // slate-50
            border: "1px solid #3b82f6", // blue-500
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
         },
         duration: 4000,
      });
   },

   promise: <T>(
      promise: Promise<T>,
      messages: {
         loading: string;
         success: string;
         error: string;
      }
   ) => {
      return toast.promise(
         promise,
         {
            loading: messages.loading,
            success: messages.success,
            error: messages.error,
         },
         {
            style: {
               background: "#1e293b",
               color: "#f8fafc",
               borderRadius: "8px",
               fontSize: "14px",
               fontWeight: "500",
            },
            success: {
               style: {
                  border: "1px solid #10b981",
               },
               iconTheme: {
                  primary: "#10b981",
                  secondary: "#f8fafc",
               },
            },
            error: {
               style: {
                  border: "1px solid #ef4444",
               },
               iconTheme: {
                  primary: "#ef4444",
                  secondary: "#f8fafc",
               },
            },
            loading: {
               style: {
                  border: "1px solid #6b7280",
               },
               iconTheme: {
                  primary: "#10b981",
                  secondary: "#f8fafc",
               },
            },
         }
      );
   },

   // Dismiss all toasts
   dismiss: () => toast.dismiss(),

   // Dismiss specific toast
   dismissToast: (toastId: string) => toast.dismiss(toastId),
};
