import { createContext, useState } from "react";
import { users } from "../../Data";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const found = users.find(
      (u) => u.name === username && u.pass === password
    );
    if (found) setUser(found);
    return found;
  };

  const register = (username, password) => {
    if (users.some((u) => u.name === username)) return null;

    const newUser = {
      name: username,
      pass: password,
      maxPoints: 0,
      numPartidas: "",
      numPAdivina: 0,
      numPNombre: 0,
      numPReloj: 0
    };

    users.push(newUser);
    setUser(newUser);
    return newUser;
  };

  const loginGuest = () => {
    const guest = { name: "invitado", maxPoints: 0 };
    setUser(guest);
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, register, loginGuest, logout }}>
      {children}
    </UserContext.Provider>
  );
}
