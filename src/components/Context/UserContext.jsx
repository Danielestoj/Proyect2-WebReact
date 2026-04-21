import { createContext, useState } from "react";
import { users } from "../../Data";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // LOGIN
  const login = (username, password) => {
    const found = users.find(
      (u) => u.name === username && u.pass === password
    );
    if (found) {
      setUser({ ...found }); // Copia para evitar mutaciones
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
      numPReloj: 0,
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
      numPReloj: 0,
    };

    users.push(newUser);
    setUser({ ...newUser });
    return newUser;
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
  };

  // ⭐ ACTUALIZAR PUNTOS
  const updateUserPoints = (name, newPoints) => {
    const index = users.findIndex((u) => u.name === name);
    if (index !== -1) {
      users[index].maxPoints = newPoints;

      // Actualizar estado del usuario
      setUser({ ...users[index] });
    }
  };

  // ⭐ ACTUALIZAR ESTADÍSTICAS DE MODO
  const updateUserStats = (name, mode) => {
    const index = users.findIndex((u) => u.name === name);
    if (index === -1) return;

    // Actualizar mock
    if (mode === "portada") users[index].numPAdivina += 1;
    if (mode === "titulo") users[index].numPNombre += 1;
    if (mode === "reloj") users[index].numPReloj += 1;

    // ⭐ Actualizar estado del usuario para que React re-renderice
    setUser({ ...users[index] });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
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
