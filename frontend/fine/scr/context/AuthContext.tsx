import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Driver, Employee } from "../types";

interface AuthState {
  driver: Driver | null;
  employee: Employee | null;
  setDriver: (d: Driver | null) => void;
  setEmployee: (e: Employee | null) => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);

  return (
    <AuthContext.Provider value={{ driver, setDriver, employee, setEmployee }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}