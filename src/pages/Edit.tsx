import { useOne, useUpdate } from "@refinedev/core";

const EditProduct = () => {
  const { data, isLoading } = useOne({ resource: "products", id: 123 });
  const { mutate, isLoading: isUpdating } = useUpdate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updatePrice = async () => {
    await mutate({
      resource: "products",
      id: 123,
      values: {
        price: Math.floor(Math.random() * 100),
      },
    });
  };

  return (
    <div>
      <div>Producto nombre: {data?.data.name}</div>
      <div>Producto precio: ${data?.data.price}</div>
      <button onClick={updatePrice}>Actualizar precio</button>
    </div>
  );
};

export default EditProduct;
