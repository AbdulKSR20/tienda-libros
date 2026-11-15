import { useState } from "react";

export default function Categorias({
    categorias,
    libros,
    cargando,
    error,
    cargarDatos,
}) {
    const [categoriaActiva, setCategoriaActiva] = useState("Todas");

    const librosFiltrados =
        categoriaActiva === "Todas"
            ? libros
            : libros.filter((libro) => libro.categoria === categoriaActiva);

    return (
        <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Categorías y Catálogo de Libros
                    </h1>
                    <p className="text-slate-600">
                        Datos consultados desde nuestra API REST Mock con MSW.
                    </p>
                </div>

                {/* Botones de control y simulación de errores */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => cargarDatos()}
                        disabled={cargando}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm
                font-medium hover:bg-indigo-700 disabled:opacity-50"
                    >
                        Actualizar
                    </button>
                    <button
                        onClick={() => cargarDatos("404")}
                        disabled={cargando}
                        className="px-3 py-2 rounded-lg bg-amber-100 text-amber-800 text-sm
                font-medium hover:bg-amber-200 disabled:opacity-50"
                    >
                        Simular 404
                    </button>
                    <button
                        onClick={() => cargarDatos("500")}
                        disabled={cargando}
                        className="px-3 py-2 rounded-lg bg-rose-100 text-rose-800 text-sm
                font-medium hover:bg-rose-200 disabled:opacity-50"
                    >
                        Simular 500
                    </button>
                </div>
            </div>

            {/* Estado de carga */}
            {cargando && (
                <div role="status" className="p-4 rounded-lg bg-indigo-50 text-indigo-700
            font-medium">
                    Cargando categorías y libros desde el servidor...
                </div>
            )}

            {/* Manejo de errores con solución alternativa  */}
            {error && (
                <div role="alert" className="p-4 rounded-lg bg-rose-50 border border-rose-200
            text-rose-800 flex items-center justify-between gap-4">
                    <div>
                        <p className="font-semibold">Ocurrió un problema: {error}</p>
                        {categorias.length > 0 && (
                            <p className="text-sm text-rose-700 mt-1">
                                Mostrando la última información cargada mientras se restablece el
                                servicio.
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => cargarDatos()}
                        disabled={cargando}
                        className="px-4 py-2 rounded-lg bg-rose-600 text-white text-sm
                font-medium hover:bg-rose-700 shrink-0"
                    >
                        Reintentar
                    </button>
                </div>
            )}

            {/* Lista de Categorías para explorar */}
            {!cargando && categorias.length > 0 && (
                <div className="space-y-3">
                    <h2 className="text-lg font-semibold text-slate-800">Explora por
                        categoría</h2>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setCategoriaActiva("Todas")}
                            className={`px-4 py-2 rounded-full text-sm font-medium border ${categoriaActiva === "Todas"
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                                }`}
                        >
                            Todas
                        </button>

                        {categorias.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setCategoriaActiva(cat.nombre)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border ${categoriaActiva === cat.nombre
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                                    }`}
                                title={cat.descripcion}
                            >
                                {cat.nombre}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Grilla de Libros filtrados */}
            {!cargando && librosFiltrados.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {librosFiltrados.map((libro) => (
                        <article key={libro.id} className="bg-white p-5 rounded-xl border
                border-slate-200 shadow-sm space-y-2">
                            <span className="inline-block text-xs font-semibold px-2.5 py-0.5
                  rounded-full bg-indigo-50 text-indigo-700">
                                {libro.categoria}
                            </span>
                            <h3 className="text-lg font-bold text-slate-900">{libro.nombre}</h3>
                            <p className="text-sm text-slate-500">Autor: {libro.autor}</p>
                            <p className="text-sm text-slate-600">{libro.descripcion}</p>
                        </article>
                    ))}
                </div>
            )
            }
        </section >
    );
}