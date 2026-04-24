import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { vi } from "vitest";

// Componentes
import Header from "../components/Header/Header";
import GameSelector from "../components/GameSelector/GameSelector";
import UserProfile from "../pages/UserProfile/UserProfile";
import Game from "../components/Game/Game";

// Contextos
import { UserContext } from "../components/Context/UserContext";
import { GameDataContext } from "../components/Context/GameDataContext";


// ======================================================
// MOCK GLOBAL DE react-router-dom 
// ======================================================
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(), // mockeamos solo esto
  };
});


// ======================================================
// TEST 1 – Navegación del logo en Header
// ======================================================
test("El logo navega a /game-selector cuando hay usuario", () => {
  const mockNavigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValue(mockNavigate);

  const mockUser = { name: "Daniel", maxPoints: 0 };

  render(
    <BrowserRouter>
      <UserContext.Provider value={{ user: mockUser }}>
        <Header />
      </UserContext.Provider>
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText("GameGuess"));

  expect(mockNavigate).toHaveBeenCalledWith("/game-selector");
});


// ======================================================
// TEST 2 – GameSelector llama a loadGameList antes de navegar
// ======================================================
test("Al pulsar un modo se llama a loadGameList", () => {
  const mockNavigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValue(mockNavigate);

  const mockLoad = vi.fn();

  render(
    <BrowserRouter>
      <GameDataContext.Provider value={{ loadGameList: mockLoad }}>
        <GameSelector />
      </GameDataContext.Provider>
    </BrowserRouter>
  );

  const button = screen.getAllByText("Empezar juego")[0];
  fireEvent.click(button);

  expect(mockLoad).toHaveBeenCalled();
});


// ======================================================
// TEST 3 – UserProfile: cambiar nombre actualiza setUser
// ======================================================
test("Cambiar nombre actualiza setUser", () => {
  const mockSetUser = vi.fn();
  const mockSetUsers = vi.fn();

  const mockUser = { name: "Daniel", maxPoints: 0 };
  const mockUsers = [mockUser];

  render(
    <BrowserRouter>
      <UserContext.Provider
        value={{
          user: mockUser,
          setUser: mockSetUser,
          users: mockUsers,
          setUsers: mockSetUsers,
        }}
      >
        <UserProfile />
      </UserContext.Provider>
    </BrowserRouter>
  );

  fireEvent.click(screen.getByTitle("Editar nombre"));

  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "Neo" } });

  fireEvent.click(screen.getByText("Guardar"));

  expect(mockSetUser).toHaveBeenCalledWith({ ...mockUser, name: "Neo" });
});


// ======================================================
// TEST 4 – Game: muestra mensaje “¡Correcto!” cuando aciertas
// ======================================================
test("Muestra '¡Correcto!' cuando la respuesta es correcta", () => {
  const mockNavigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValue(mockNavigate);

  const mockUser = { name: "Daniel", maxPoints: 0 };
  const mockGame = { name: "Halo", background_image: "" };

  render(
    <BrowserRouter>
      <UserContext.Provider
        value={{
          user: mockUser,
          setUser: vi.fn(),
          updateUserPoints: vi.fn(),
          updateUserStats: vi.fn(),
        }}
      >
        <GameDataContext.Provider
          value={{
            game: mockGame,
            games: [mockGame],
            loadNewGame: vi.fn(),
          }}
        >
          <Game />
        </GameDataContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );

  // Seleccionar opción en el <select>
  const select = screen.getByRole("combobox");
  fireEvent.change(select, { target: { value: "Halo" } });

  // Enviar
  fireEvent.click(screen.getByText("Enviar"));

  // Comprobar mensaje
  expect(screen.getByText("¡Correcto!")).toBeInTheDocument();
});
