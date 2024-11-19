import { DataProvider } from "@refinedev/core";

//const API_URL = "https://api.fake-rest.refine.dev";
const API_URL = "http://localhost:1337/api";

const fetcher = async (url: string, options?: RequestInit) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};

const dataProvider: DataProvider = {
  getMany: async ({ resource, ids, meta }) => {
    const params = new URLSearchParams();

    if (ids) {
      ids.forEach((id) => params.append("id", id));
    }

    const response = await fetcher(
      `${API_URL}/${resource}?${params.toString()}`
    );

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  // getOne: async ({ resource, id, meta }) => {
  //   const response = await fetcher(`${API_URL}/${resource}/${id}`);

  //   if (response.status < 200 || response.status > 299) throw response;

  //   const data = await response.json();

  //   return { data };
  // },
  getOne: async ({ id, resource }) => {
    const response = await fetcher(
      `${API_URL}/${resource}?filters[id][$eq]=${id}`
    );

    if (response.status < 200 || response.status > 299) {
      throw response;
    }

    const data = await response.json();

    return { data };
  },
  update: async ({ resource, id, variables, meta }) => {
    console.log("Intentando actualizar registro con documentId:", id);
    console.log("Variables originales:", variables);

    try {
      // Usar el documentId para la URL
      const updateUrl = `${API_URL}/${resource}/${variables.documentId}`;
      console.log("URL de actualización:", updateUrl);

      // Eliminar documentId de los datos a enviar
      const { documentId, ...updateData } = variables;
      console.log("Datos a actualizar (sin documentId):", updateData);

      const response = await fetch(updateUrl, {
        method: "PUT",
        body: JSON.stringify({
          data: updateData
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al actualizar:", errorText);
        throw new Error(`Error al actualizar: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Respuesta de actualización:", data);
      return { data: data.data };
    } catch (error) {
      console.error("Error durante la actualización:", error);
      throw error;
    }
  },
  // getList: async ({ resource, pagination, filters, sorters }) => {
  //   const params = new URLSearchParams();

  //   if (pagination) {
  //     const start = (
  //       (pagination.current! - 1) *
  //       pagination.pageSize!
  //     ).toString();
  //     const end = (pagination.current! * pagination.pageSize!).toString();

  //     params.append("_start", start);
  //     params.append("_end", end);
  //   }

  //   if (sorters && sorters.length > 0) {
  //     params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
  //     params.append("_order", sorters.map((sorter) => sorter.order).join(","));
  //   }

  //   if (filters && filters.length > 0) {
  //     filters.forEach((filter) => {
  //       if ("field" in filter && filter.operator === "eq") {
  //         params.append(filter.field, filter.value);
  //       }
  //     });
  //   }

  //   const response = await fetcher(
  //     `${API_URL}/${resource}?${params.toString()}`
  //   );

  //   if (response.status < 200 || response.status > 299) throw response;
  //   const data = await response.json();
  //   const total = Number(response.headers.get("x-total-count"));
  //   return {
  //     data,
  //     total,
  //   };
  // },
  getList: async ({ resource, pagination, filters, sorters }) => {
    const params = new URLSearchParams();

    // Configuración de paginación y ordenación...
    if (pagination) {
      const start = (
        (pagination.current! - 1) *
        pagination.pageSize!
      ).toString();
      const end = (pagination.current! * pagination.pageSize!).toString();
      params.append("_start", start);
      params.append("_end", end);
    }

    if (sorters) {
      params.append("_sort", sorters.map((s) => s.field).join(","));
      params.append("_order", sorters.map((s) => s.order).join(","));
    }

    if (filters) {
      filters.forEach((filter) => {
        if (filter.operator === "eq") {
          params.append(filter.field, filter.value);
        }
      });
    }

    const response = await fetcher(
      `${API_URL}/${resource}?${params.toString()}`
    );
    if (!response.ok) throw response;

    let rawData = await response.json();

    let data = Array.isArray(rawData.data) ? rawData.data : [rawData.data];

    const total = Number(response.headers.get("x-total-count"));
    return { data, total };
  },
  create: async ({ resource, variables }) => {
    const response = await fetcher(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify({ data: variables }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();
    return { data: data.data };
  },
  deleteOne: async ({ resource, id }) => {
    console.log("Intentando eliminar registro con documentId:", id);
    
    try {
      // Construir la URL de eliminación usando directamente el documentId
      const deleteUrl = `${API_URL}/${resource}/${id}`;
      console.log("URL de eliminación:", deleteUrl);

      // Eliminar el registro
      const deleteResponse = await fetcher(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Respuesta de eliminación status:", deleteResponse.status);

      if (!deleteResponse.ok) {
        console.log("Error al eliminar:", deleteResponse.statusText);
        const errorText = await deleteResponse.text();
        console.log("Error detallado:", errorText);
        throw new Error(`Error al eliminar: ${errorText}`);
      }

      // En Strapi v4, la respuesta DELETE puede ser vacía
      try {
        const responseText = await deleteResponse.text();
        console.log("Respuesta texto:", responseText);
        
        if (responseText) {
          const deletedData = JSON.parse(responseText);
          return { data: deletedData.data };
        } else {
          console.log("Eliminación exitosa");
          return { data: null };
        }
      } catch (jsonError) {
        console.log("Eliminación exitosa (sin respuesta JSON)");
        return { data: null };
      }
    } catch (error) {
      console.error("Error durante la eliminación:", error);
      throw error;
    }
  },
  getApiUrl: () => API_URL,
};

export default dataProvider;
