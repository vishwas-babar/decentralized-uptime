import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import type { LoginUser } from "@repo/schema/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserSchema } from "../../../../packages/schema/src/user/user.schema";
import useLoginUser from "@/lib/mutations/user/login-user";
import { showToast } from "@/lib/toast";
import { setBearerToken } from "@/utils/token";

export function LoginForm() {
   const { mutate: loginUser, isPending } = useLoginUser();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginUser>({
      resolver: zodResolver(LoginUserSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = (data: LoginUser) => {
      loginUser(data, {
         onSuccess: res => {
            showToast.success("Welcome back! Login successful.");
            setBearerToken(res.data.token);
            window.location.href = "/dashboard";
         },
         onError: (error: any) => {
            const errorMessage =
               error?.response?.data?.message ||
               error?.message ||
               "Login failed. Please try again.";
            showToast.error(errorMessage);
         },
      });
   };

   return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 shadow-2xl">
         {/* Logo */}
         <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
               <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
               <span className="text-white font-semibold text-lg">
                  UptimeRobot
               </span>
            </div>
         </div>

         {/* Welcome message */}
         <div className="text-center mb-8">
            <h1 className="text-2xl text-white mb-1">
               <span className="text-emerald-400">Welcome</span> back!
            </h1>
         </div>

         {/* Form */}
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email field */}
            <div>
               <label
                  htmlFor="email"
                  className="block text-sm text-slate-400 mb-2"
               >
                  Your e-mail
               </label>
               <Input
                  id="email"
                  type="email"
                  placeholder="info@example.com"
                  {...register("email")}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20"
               />
               {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                     {errors.email.message}
                  </p>
               )}
            </div>

            {/* Password field */}
            <div>
               <label
                  htmlFor="password"
                  className="block text-sm text-slate-400 mb-2"
               >
                  Password
               </label>
               <Input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  {...register("password")}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20"
               />
               {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                     {errors.password.message}
                  </p>
               )}
            </div>

            {/* Remember me checkbox - UI only, not in form data */}
            <div className="flex items-center space-x-2">
               <Checkbox
                  id="remember"
                  className="border-slate-600 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
               />
               <label
                  htmlFor="remember"
                  className="text-sm text-slate-400 cursor-pointer"
               >
                  Remember me for 30 days
               </label>
            </div>

            {/* Login button */}
            <Button
               type="submit"
               disabled={isPending}
               className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {isPending ? "Logging in..." : "Log in"}
            </Button>

            {/* Forgot password link */}
            <div className="text-center">
               <Link
                  to="/forgot-password"
                  className="text-sm text-emerald-400 hover:text-emerald-300 underline transition-colors"
               >
                  Forgot your password?
               </Link>
            </div>
         </form>

         {/* Sign up link */}
         <div className="text-center mt-8 pt-6 border-t border-slate-700">
            <p className="text-slate-400 text-sm">Don't have an account yet?</p>
            <Link
               to="/signup"
               className="text-emerald-400 hover:text-emerald-300 underline text-sm transition-colors"
            >
               Create your Free account now
            </Link>
         </div>
      </div>
   );
}
