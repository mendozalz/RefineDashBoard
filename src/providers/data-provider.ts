import { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

const dataProvider: DataProvider = {
  getOne: async ({ id, resource }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`);

    if (response.status < 200 || response.status > 299) {
      throw response;
    }

    const data = await response.json();

    return { data };
  },
  update: () => {
    throw new Error("Not implemented");
  },
  getList: () => {
    throw new Error("Not implemented");
  },
  create: () => {
    throw new Error("Not implemented");
  },
  deleteOne: () => {
    throw new Error("Not implemented");
  },
  getApiUrl: () => API_URL,
};

export default dataProvider;
