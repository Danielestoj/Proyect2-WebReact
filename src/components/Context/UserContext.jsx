import { createContext, useState } from "react";
import { users as initialUsers } from "../../Data";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers); // Ahora sí existe
  const [user, setUser] = useState(null);

  // LOGIN
  const login = (username, password) => {
    const found = users.find(
      (u) => u.name === username && u.pass === password
    );
    if (found) {
      setUser({ ...found });
      return true;
    }
    return false;
  };

  // LOGIN INVITADO
  const loginGuest = () => {
    const guest = {
      name: "Invitado",
      pass: "",
      maxPoints: 0,
      numPartidas: "",
      numPAdivina: 0,
      numPNombre: 0,
    };
    setUser(guest);
  };

  // REGISTRO
  const register = (username, password) => {
    if (users.some((u) => u.name === username)) return null;

    const newUser = {
      name: username,
      pass: password,
      maxPoints: 0,
      numPartidas: "",
      numPAdivina: 0,
      numPNombre: 0,
    };

    setUsers([...users, newUser]); // Ahora sí actualiza React
    setUser({ ...newUser });
    return newUser;
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
  };

  // ACTUALIZAR PUNTOS
  const updateUserPoints = (name, newPoints) => {
    const index = users.findIndex((u) => u.name === name);
    if (index !== -1) {
      const updated = [...users];
      updated[index].maxPoints = newPoints;

      setUsers(updated);
      setUser({ ...updated[index] });
    }
  };

  // ACTUALIZAR ESTADÍSTICAS DE MODO
  const updateUserStats = (name, mode) => {
    const index = users.findIndex((u) => u.name === name);
    if (index === -1) return;

    const updated = [...users];

    if (mode === "portada") updated[index].numPAdivina += 1;
    if (mode === "titulo") updated[index].numPNombre += 1;

    setUsers(updated);
    setUser({ ...updated[index] });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        users,
        setUsers,
        login,
        loginGuest,
        register,
        logout,
        updateUserPoints,
        updateUserStats,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
