import { createContext, useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

type ChatHistory = {
  role: string;
  content: string;
};

type Disclaimer = {
  id: string;
  topic: string;
  tone: string;
  statement: string;
  chat_history: ChatHistory[];
};

type AuthContextType = {
  downloadPDF: (id: string) => Promise<void>;
  activeDisclaimerId: string | null;
  setActiveDisclaimerId: React.Dispatch<React.SetStateAction<string | null>>;
  generatedDisclaimer: string;
  setGeneratedDisclaimer: React.Dispatch<React.SetStateAction<string>>;
  handleCloseButton: () => void;
  createDisclaimer: (
    messages: { role: string; content: string }[]
  ) => Promise<string>;

  continueConversation: (
    disclaimer_id: string,
    message: string
  ) => Promise<Disclaimer>;

  disclaimers: Disclaimer[];
  setDisclaimers: React.Dispatch<React.SetStateAction<Disclaimer[]>>;
  isLoggedIn: boolean;
  updateDisclaimers: () => Promise<void>;
  logout: (navigate: NavigateFunction) => Promise<void>;
  login: (
    credentials: { email: string; password: string },
    navigate: NavigateFunction
  ) => Promise<void>;
  deletion: (id: string) => Promise<void>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  messages: { role: string; content: string }[];

  setMessages: React.Dispatch<
    React.SetStateAction<{ role: string; content: string }[]>
  >;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeDisclaimerId, setActiveDisclaimerId] = useState<string | null>(
    null
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [generatedDisclaimer, setGeneratedDisclaimer] = useState("");

  const [disclaimers, setDisclaimers] = useState<Disclaimer[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );

  const handleCloseButton = () => {
    setIsOpen((prev) => !prev);
  };

  const updateDisclaimers = async () => {
    const res = await fetch(`http://localhost:3000/disclaimers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    setDisclaimers(data);
  };

  const continueConversation = async (
    disclaimerId: string,
    message: string
  ) => {
    const formattedPrompt = [{ role: "user", content: message }];

    try {
      const res = await fetch(
        `http://localhost:3000/disclaimers/${disclaimerId}/continue`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            disclaimer: {
              message,
            },
          }),
        }
      );
      const data = await res.json();
      await updateDisclaimers();
      return data;
    } catch (error) {
      console.error("Error continuing conversation", error);
    }
  };

  const createDisclaimer = async (
    messages: { role: string; content: string }[]
  ) => {
    const formattedPrompt = [...messages];

    try {
      const res = await fetch("http://localhost:3000/disclaimers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          disclaimer_id: activeDisclaimerId,
          disclaimer: {
            message: formattedPrompt,
          },
        }),
        credentials: "include",
      });

      const data = await res.json();
      setGeneratedDisclaimer(data.statement);

      if (!activeDisclaimerId) {
        setActiveDisclaimerId(data.id);
        await updateDisclaimers();
      }

      await updateDisclaimers();
      return data.statement;
    } catch (error) {
      console.error("Error generating disclaimer:", error);
      setGeneratedDisclaimer(
        "Something went wrong while generating the disclaimer."
      );
    }
  };

  const login = async (
    { email, password }: { email: string; password: string },
    navigate: NavigateFunction
  ) => {
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
        navigate("/dashboard");

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

  const logout = async (navigate: (path: string) => void) => {
    try {
      const res = await fetch("http://localhost:3000/users/sign_out", {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setIsLoggedIn(false);
        navigate("/signin");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      setIsLoggedIn(false);
    }
  };
  const deletion = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`http://localhost:3000/disclaimers/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (res.ok) {
        console.log("Disclaimer deleted");
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const downloadPDF = async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/disclaimers/${id}/download_pdf`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (!res.ok) {
        console.log("download failed");
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `disclaimer-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF", error);
    }
  };

  useEffect(() => {}, [isLoggedIn]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:3000/check", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logout,
        login,
        deletion,
        disclaimers,
        setDisclaimers,
        updateDisclaimers,
        generatedDisclaimer,
        setGeneratedDisclaimer,
        setIsOpen,
        isOpen,
        handleCloseButton,
        createDisclaimer,
        messages,
        setMessages,
        activeDisclaimerId,
        setActiveDisclaimerId,
        continueConversation,
        downloadPDF,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
