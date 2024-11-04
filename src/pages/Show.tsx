import { useShow } from "@refinedev/core";

const ShowProduct = () => {
  const {
    query: { data, isLoading },
  } = useShow();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>Producto nombre: {data?.data.name}</div>;
};

export default ShowProduct;
