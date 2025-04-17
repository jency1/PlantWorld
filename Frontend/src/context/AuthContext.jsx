import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // TEMPORARY: Simulate login during development
  useEffect(() => {
    const dummyToken = "dummyToken123";
    const dummyUser = { email: "dev@example.com", name: "Developer" };

    setToken(dummyToken);
    setUser(dummyUser);
    localStorage.setItem("token", dummyToken);
  }, []);

  //   USE THIS CODE ONCE THE LOG-IN/LOG-OUT IS DONE

  //   useEffect(() => {
  //     if (token) {
  //       // Optional: fetch user profile with token here
  //       setUser({ email: "user@example.com" }); // Replace with actual user info
  //     }
  //   }, [token]);

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
