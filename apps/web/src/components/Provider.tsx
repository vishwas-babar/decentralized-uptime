import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "react-hot-toast";

const Provider = ({ children }: { children: React.ReactNode }) => {
   const queryClient = new QueryClient();

   return (
      <>
         <QueryClientProvider client={queryClient}>
            {children}
         </QueryClientProvider>

         <Toaster
            position="top-right"
            toastOptions={{
               // Default options for all toasts
               duration: 4000,
               style: {
                  background: "#1e293b", // slate-800
                  color: "#f8fafc", // slate-50
                  border: "1px solid #334155", // slate-700
               },
               // Success toast styling
               success: {
                  style: {
                     background: "#1e293b",
                     color: "#f8fafc",
                     border: "1px solid #10b981", // emerald-500
                  },
                  iconTheme: {
                     primary: "#10b981", // emerald-500
                     secondary: "#f8fafc",
                  },
               },
               // Error toast styling
               error: {
                  style: {
                     background: "#1e293b",
                     color: "#f8fafc",
                     border: "1px solid #ef4444", // red-500
                  },
                  iconTheme: {
                     primary: "#ef4444", // red-500
                     secondary: "#f8fafc",
                  },
               },
               // Loading toast styling
               loading: {
                  style: {
                     background: "#1e293b",
                     color: "#f8fafc",
                     border: "1px solid #6b7280", // gray-500
                  },
                  iconTheme: {
                     primary: "#10b981", // emerald-500
                     secondary: "#f8fafc",
                  },
               },
            }}
         />
      </>
   );
};

export default Provider;
