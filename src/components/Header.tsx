import { useGetIdentity, useLogout, useNavigation } from "@refinedev/core";
import { Link } from "react-router-dom";

const Header = () => {
  const { mutate, isLoading } = useLogout();
  const { data: identity } = useGetIdentity();

  const { listUrl, createUrl } = useNavigation();

  return (
    <>
      <h2>
        <span>Welcome, </span>
        <span>{identity?.name ?? ""}</span>
      </h2>
      <Link to={listUrl("protected-products")}>Lista de productos</Link>
      <Link to={createUrl("protected-products")}>Crear productos</Link>
      <button
        type="button"
        disabled={isLoading}
        onClick={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        Logout
      </button>
    </>
  );
};

export default Header;
