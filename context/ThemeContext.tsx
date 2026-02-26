"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";
import { handleUpdateTheme } from "@/lib/actions/users/auth-action";
import { useAuth } from "@/context/AuthContext";

export type Theme = "light" | "dark" | "system";

function resolveDark(theme: Theme): boolean {
  if (theme === "dark") return true;
  if (theme === "light") return false;
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  initialTheme: Theme;
  children: ReactNode;
}

export function ThemeProvider({ initialTheme, children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const { isAuthenticated, checkAuth } = useAuth();

  const applyTheme = useCallback((t: Theme) => {
    const dark = resolveDark(t);
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    if (dark || t === "system") {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => applyTheme("system");
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [theme, applyTheme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      applyTheme(newTheme);
      if (!isAuthenticated) return;
      handleUpdateTheme(newTheme).then((result) => {
        if (result.success) {
          checkAuth();
        } else {
          toast.error(result.message || "Could not save theme");
        }
      }).catch(() => {
        toast.error("Could not save theme");
      });
    },
    [isAuthenticated, checkAuth]
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

export function useThemeOptional(): ThemeContextValue | undefined {
  return useContext(ThemeContext);
}
