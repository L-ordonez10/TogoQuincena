"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, AlertCircle } from "lucide-react";
import { THEME } from "@/lib/constants";

export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (attempts >= 5) {
      setError("Demasiados intentos. Espera un momento.");
      return;
    }

    const success = authService.authenticate(password);

    if (success) {
      setIsAuthenticated(true);
      setPassword("");
      setAttempts(0);
    } else {
      setError("Contraseña incorrecta");
      setAttempts(prev => prev + 1);
      setPassword("");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="animate-pulse text-lg text-gray-600">Verificando acceso...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white p-8 shadow-2xl">
            <div className="mb-8 flex justify-center">
              <div 
                className="rounded-full p-4"
                style={{ backgroundColor: `${THEME.colors.green}20` }}
              >
                <Lock size={48} style={{ color: THEME.colors.green }} />
              </div>
            </div>

            <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
              Acceso Restringido
            </h1>
            <p className="mb-8 text-center text-sm text-gray-600">
              Ingresa la contraseña para acceder al dashboard
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  autoFocus
                  disabled={attempts >= 5}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                style={{
                  backgroundColor: THEME.colors.green,
                  color: THEME.colors.black,
                }}
                disabled={!password || attempts >= 5}
              >
                Ingresar
              </Button>

              {attempts > 0 && attempts < 5 && (
                <p className="text-center text-xs text-gray-500">
                  Intentos: {attempts}/5
                </p>
              )}
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => router.push("/")}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Volver al inicio
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-gray-500">
            Esta página está protegida por contraseña
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
