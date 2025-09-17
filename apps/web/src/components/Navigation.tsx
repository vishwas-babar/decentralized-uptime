import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Shield,
  Activity,
  Bell,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import useSession from "@/hooks/useSession";
import { removeBearerToken } from "@/utils/token";

export function Navigation() {
  const location = useLocation();
  const { session } = useSession();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/validators", label: "Validators", icon: Shield },
    { path: "/monitors", label: "Monitors", icon: Activity },
  ];

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-white font-semibold text-lg">
                UptimeRobot
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center gap-2">
              {navItems.map(item => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-2 ${
                      location.pathname === item.path
                        ? "bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <Bell className="h-5 w-5" />
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <Settings className="h-5 w-5" />
            </Button>

            {/* User Profile */}
            <div className="flex items-center gap-3 bg-slate-700/50 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-slate-400" />
                <span className="text-white text-sm">{session?.email}</span>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                Pro
              </Badge>
            </div>

            {/* Logout */}
            <Button
              onClick={() => {
                removeBearerToken();
                window.location.reload();
              }}
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-red-400 hover:bg-slate-700"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
