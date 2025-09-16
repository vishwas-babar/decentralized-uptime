import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import type { RegisterUser } from "@repo/schema/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUserSchema } from "../../../../packages/schema/src/user/user.schema";
import useRegisterUser from "@/lib/mutations/register-user";
import { showToast } from "@/lib/toast";

export function SignupForm() {
  const { mutate: registerUser, isPending } = useRegisterUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterUser) => {
    registerUser(data, {
      onSuccess: () => {
        showToast.success(
          "Account created successfully! Welcome to UptimeRobot."
        );
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Registration failed. Please try again.";
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
          <span className="text-white font-semibold text-lg">UptimeRobot</span>
        </div>
      </div>

      {/* Welcome message */}
      <div className="text-center mb-8">
        <h1 className="text-2xl text-white mb-1">
          Create your <span className="text-emerald-400">account</span>
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Join thousands of developers monitoring their services
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name field - maps to 'name' in schema */}
        <div>
          <label htmlFor="name" className="block text-sm text-slate-400 mb-2">
            Full name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm text-slate-400 mb-2">
            Email address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="info@example.com"
            {...register("email")}
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
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

        {/* Terms and conditions - just for UI, not in form data */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            className="border-slate-600 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 mt-0.5"
          />
          <label
            htmlFor="terms"
            className="text-sm text-slate-400 cursor-pointer leading-relaxed"
          >
            I agree to the{" "}
            <Link
              to="/terms"
              className="text-emerald-400 hover:text-emerald-300 underline transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-emerald-400 hover:text-emerald-300 underline transition-colors"
            >
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Sign up button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating account..." : "Create account"}
        </Button>

        {/* Alternative signup methods */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-slate-800/50 px-2 text-slate-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50 hover:border-slate-500"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50 hover:border-slate-500"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.097.118.112.222.082.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
            </svg>
            GitHub
          </Button>
        </div>
      </form>

      {/* Login link */}
      <div className="text-center mt-8 pt-6 border-t border-slate-700">
        <p className="text-slate-400 text-sm">Already have an account?</p>
        <Link
          to="/login"
          className="text-emerald-400 hover:text-emerald-300 underline text-sm transition-colors"
        >
          Sign in to your account
        </Link>
      </div>
    </div>
  );
}
