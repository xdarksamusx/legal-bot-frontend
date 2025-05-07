import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  logout: () => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async ({ email, password }) => {
    try {
      const res = await fetch("http://localhost:3000/users/sign_in", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user: { email, password },
        }),
      });

      if (res.ok) {
        setIsLoggedIn(true);
        console.log("Login successful and login status", isLoggedIn);
      } else {
        setIsLoggedIn(false);
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoggedIn(false);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:3000/users/sign_out", {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setIsLoggedIn(false);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      setIsLoggedIn(false);
    }
  };

  //   const delete = async () => {

  //   }

  useEffect(() => {
    console.log("isLoggedIn updated:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
