"use client";

import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { firebaseAuth } from "@/lib/firebase";

type AdminAuthContextValue = {
  user: User | null;
  loading: boolean;
  getToken: () => Promise<string>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseAuth) {
      setLoading(false);
      return;
    }

    return onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const getToken = async () => {
    if (!user) {
      throw new Error("Admin is not authenticated.");
    }

    return user.getIdToken();
  };

  return (
    <AdminAuthContext.Provider value={{ user, loading, getToken }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider.");
  }

  return context;
};
