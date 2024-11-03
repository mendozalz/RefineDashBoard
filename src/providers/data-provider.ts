import { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

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
  getMany: async ({ resource, ids }) => {
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
  getOne: async ({ id, resource }) => {
    const response = await fetcher(`${API_URL}/${resource}/${id}`);

    if (response.status < 200 || response.status > 299) {
      throw response;
    }

    const data = await response.json();

    return { data };
  },
  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status < 200 || response.status > 299) {
      throw response;
    }
    const data = await response.json();
    return { data };
  },
  getList: async ({ resource, pagination, filters, sorters }) => {
    console.log("=== Debug Info ===");

    console.log("Meta:", JSON.stringify(sorters, null, 2));
    const params = new URLSearchParams();

    if (pagination) {
      const start = (
        (pagination.current! - 1) *
        pagination.pageSize!
      ).toString();
      const end = (pagination.current! * pagination.pageSize!).toString();

      params.append("_start", start);
      params.append("_end", end);
    }

    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          params.append(filter.field, filter.value);
        }
      });
    }

    const response = await fetcher(
      `${API_URL}/${resource}?${params.toString()}`
    );

    if (response.status < 200 || response.status > 299) throw response;
    const data = await response.json();
    const total = Number(response.headers.get("x-total-count"));
    return {
      data,
      total,
    };
  },
  create: async ({ resource, variables }) => {
    const response = await fetcher(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();
    return { data };
  },
  deleteOne: () => {
    throw new Error("Not implemented");
  },
  getApiUrl: () => API_URL,
};

export default dataProvider;
