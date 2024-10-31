import { useOne } from "@refinedev/core";

const ShowProduct = () => {
  const { data, isLoading } = useOne({ resource: "products", id: 123 });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>Producto nombre: {data?.data.name}</div>;
};

export default ShowProduct;
