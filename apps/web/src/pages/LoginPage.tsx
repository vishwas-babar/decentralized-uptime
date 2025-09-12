import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent)] pointer-events-none" />

      <div className="w-full max-w-md relative">
        <LoginForm />
      </div>
    </div>
  );
}
