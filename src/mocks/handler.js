import { http, HttpResponse, delay } from "msw";
import libros from "../data/libros.json";
import categorias from "../data/categorias.json";

export const handlers = [
    http.get("/api/categorias", async ({ request }) => {
        await delay(1000);

        const url = new URL(request.url)
        const error = url.searchParams.get("error");

        if (error === "404") {
          return HttpResponse.json(
            { message: "No se encontraron categorías" },
            { status: 404 }
          );
        }

        if (error === "500") {
          return HttpResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
          );
        }

        return HttpResponse.json(categorias);
      }),

     http.get("/api/libros", async ({ request }) => {
        await delay(800);

        const url = new URL(request.url);
        const error = url.searchParams.get("error");
        const categoria = url.searchParams.get("categoria");
    
        if (error === "404") {
          return HttpResponse.json({ message: "Libros no encontrados" }, { status: 404 });
        }
        if (error === "500") {
          return HttpResponse.json({ message: "Error del servidor" }, { status: 500 });
        }

        const resultado = categoria
          ? libros.filter((libro) => libro.categoria === categoria)
          : libros;

        return HttpResponse.json(resultado);
      }),
    ];

