import { useList } from "@refinedev/core";

const ListProducts = () => {
  const { data, isLoading } = useList({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: [{ field: "name", order: "asc" }],
    filters: [{ field: "material", operator: "eq", value: "Aluminum" }],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Lista de productos</h1>
      <ol>
        {data?.data.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            Precio: {item.price}
            <br />
            Material: {item.material}
            <br />
            <br />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ListProducts;
