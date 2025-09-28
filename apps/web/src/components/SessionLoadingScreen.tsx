const SessionLoadingScreen = () => {
   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-4">
         {/* Background decoration */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent)] pointer-events-none" />

         {/* Animated dots */}
         <div className="flex justify-center mt-4">
            <div className="flex space-x-1">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
            </div>
         </div>
      </div>
   );
};

export default SessionLoadingScreen;
