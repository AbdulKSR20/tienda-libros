import { Link } from "react-router";

export default function Inicio({ categorias, cargando, error }) {
    return (
        <section className="space-y-8">
            {/* Bienvenida principal */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm
          space-y-4">
                <h1 className="text-3xl font-bold text-slate-900">
                    Bienvenido a tu Tienda de Libros 📚
                </h1>
                <p className="text-slate-600 max-w-2xl">
                    Explora nuestro catálogo organizado por géneros literarios y descubre tu
                    próxima lectura.
                </p>
                <Link
                    to="/categorias"
                    className="inline-block px-5 py-2.5 rounded-lg bg-indigo-600 text-white
              font-medium hover:bg-indigo-700"
                >
                    Explorar catálogo completo
                </Link>
            </div>

            {/* Tarjetas de categorías cargadas desde la API Mock */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800">
                    Categorías disponibles
                </h2>

                {cargando && (
                    <p role="status" className="text-indigo-600 font-medium">
                        Cargando categorías...
                    </p>
                )}

                {error && !cargando && (
                    <p role="alert" className="text-rose-600 font-medium">
                        No pudimos cargar las categorías ({error}). Entra al catálogo para
                        reintentar.
                    </p>
                )}

                {!cargando && categorias.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categorias.map((cat) => (
                            <article
                                key={cat.id}
                                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm
                    hover:border-indigo-300 transition space-y-2"
                            >
                                <h3 className="text-lg font-bold text-slate-900">
                                    {cat.nombre}
                                </h3>
                                <p className="text-sm text-slate-600">
                                    {cat.descripcion}
                                </p>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}