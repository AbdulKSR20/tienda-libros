import { useCallback, useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router";
import { obtenerCategorias, obtenerLibros } from "./services/api";
import Categorias from './pages/Categorias.jsx'
import Inicio from './pages/Inicio.jsx'
import PaginaNoEncontrada from './pages/PaginaNoEncontrada.jsx'

export default function App() {
  const [categorias, setCategorias] = useState([]);
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarDatos = useCallback((tipoError = "") => {
    setCargando(true);
    setError("");

    Promise.all([
      obtenerCategorias(tipoError),
      obtenerLibros(tipoError),
    ])
      .then(([datosCategorias, datosLibros]) => {
        setCategorias(datosCategorias);
        setLibros(datosLibros);
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      obtenerCategorias("", controller.signal),
      obtenerLibros("", controller.signal),
    ])
      .then(([datosCategorias, datosLibros]) => {
        setCategorias(datosCategorias);
        setLibros(datosLibros);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; 
        setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      });

    return () => controller.abort(); // Cancelar si se desmonta
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <nav className="max-w-6xl mx-auto flex gap-6" aria-label="Navegación principal">
          <NavLink to="/" end className={({ isActive }) => isActive ? "font-bold text-indigo-600" : "text-slate-600"}>
            Inicio
          </NavLink>
          <NavLink to="/categorias" className={({ isActive }) => isActive ? "font-bold text-indigo-600" : "text-slate-600"}>
            Categorías y Libros
          </NavLink>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Inicio categorias={categorias} cargando={cargando} error={error} />} />
          <Route path="/categorias" element={<Categorias categorias={categorias} libros={libros} cargando={cargando} error={error} cargarDatos={cargarDatos} />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>
    </div >
  );
}