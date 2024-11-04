import { Authenticated, Refine } from "@refinedev/core";
import "./App.css";
import dataProvider from "./providers/data-provider";
import ShowProduct from "./pages/Show";
import EditProduct from "./pages/Edit";
import ListProducts from "./pages/List";
import CreateProduct from "./pages/Create";
import { authProvider } from "./providers/auth-provider";
import Login from "./components/Login";
import Header from "./components/Header";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
        resources={[
          {
            name: "protected-products",
            list: "/products",
            show: "/products/:id",
            edit: "/products/:id/edit",
            create: "/products/create",
            meta: { label: "Products" },
          },
        ]}
      >
        <Routes>
          <Route
            element={
              <Authenticated key="authenticated-routes" redirectOnFail="/login">
                <Header />
                <Outlet />
              </Authenticated>
            }
          >
            <Route
              index
              element={<NavigateToResource resource="protected-products" />}
            />
            <Route index element={<Navigate to="/products" />} />
            <Route path="/products">
              <Route index element={<ListProducts />} />
              <Route path=":id" element={<ShowProduct />} />
              <Route path=":id/edit" element={<EditProduct />} />
              <Route path="create" element={<CreateProduct />} />
            </Route>
          </Route>
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                <NavigateToResource resource="protected-products" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}

export default App;
