import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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
          <span className="text-emerald-400">Welcome</span> back!
        </h1>
      </div>

      {/* Form */}
      <form className="space-y-6">
        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm text-slate-400 mb-2">
            Your e-mail
          </label>
          <Input
            id="email"
            type="email"
            placeholder="info@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20"
          />
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
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20"
          />
        </div>

        {/* Remember me checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={checked => setRememberMe(checked as boolean)}
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
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-lg transition-colors"
        >
          Log in
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
          to="/register"
          className="text-emerald-400 hover:text-emerald-300 underline text-sm transition-colors"
        >
          Create your Free account now
        </Link>
      </div>
    </div>
  );
}
