export async function consultarEndpoint(endpoint, tipoError = "", signal) {
    const url = tipoError ? `${endpoint}?error=${tipoError}` : endpoint;

    try {
        const respuesta = await fetch(url, { signal });

        if (!respuesta.ok) {
            if (respuesta.status === 404) {
                throw new Error("Recurso no encontrado");
            }
            if (respuesta.status === 500) {
                throw new Error("Error del servidor");
            }
            throw new Error("Error desconocido al consultar el servidor");
        }

        return await respuesta.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error(
                "No fue posible conectarse al servidor, reintente más tarde",
                { cause: error }
            );
        }
        throw error;
    }
}

    export function obtenerCategorias(tipoError = "", signal) {
        return consultarEndpoint("/api/categorias", tipoError, signal);
    }

    export function obtenerLibros(tipoError = "", signal) {
        return consultarEndpoint("/api/libros", tipoError, signal);
    }