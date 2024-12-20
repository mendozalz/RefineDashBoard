import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";
import { Authenticated, Refine } from "@refinedev/core";
import dataProvider from "./providers/data-provider";
import ShowProduct from "./pages/Show";
import EditProduct from "./pages/Edit";
import ListProducts from "./pages/List";
import CreateProduct from "./pages/Create";
import { authProvider } from "./providers/auth-provider";
import Login from "./components/Login";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { ConfigProvider, App as AntdApp } from "antd";
import {
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "antd/dist/reset.css";
import ListCustomers from "./pages/costumers/ListCostumers";
import ShowMachines from "./pages/costumers/ShowMachines";
import ShowServers from "./pages/costumers/ShowServers";
import ShowAccounts from "./pages/costumers/ShowAccounts";
import EditTradingMachine from "./pages/costumers/EditTradingMachine";
import CreateTradingMachine from "./pages/costumers/CreateTradingMachine";

function App(): JSX.Element {
  return (
    (<BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              authProvider={authProvider}
              routerProvider={routerProvider}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "protected-products",
                  list: "/products",
                  show: "/products/:id",
                  edit: "/products/:id/edit",
                  create: "/products/create",
                  meta: { label: "Fila 1" },
                },
                {
                  name: "trading-server-machines",
                  list: "/trading-server-machines",
                  show: "/trading-server-machines/:id",
                  edit: "/trading-server-machines/:id/edit",
                  create: "/trading-server-machines/create",
                },
              ]}
              options={{
                projectId: "N6Ire2-Hexe3X-Tclpd1"
              }}>
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-routes"
                      redirectOnFail="/login"
                    >
                      <ThemedLayoutV2
                        Title={(props) => (
                          <ThemedTitleV2 {...props} icon text="INVENTEK" />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={
                      <NavigateToResource resource="protected-products" />
                    }
                  />
                  <Route index element={<Navigate to="/products" />} />
                  <Route path="/products">
                    <Route index element={<ListProducts />} />
                    <Route path=":id" element={<ShowProduct />} />
                    <Route path=":id/edit" element={<EditProduct />} />
                    <Route path="create" element={<CreateProduct />} />
                  </Route>
                  <Route path="/trading-server-machines">
                    <Route index element={<ListCustomers />} />
                    <Route path=":id" element={<ShowMachines />} />
                    <Route path=":id/servers" element={<ShowServers />} />
                    <Route path=":id/accounts" element={<ShowAccounts />} />
                    <Route path=":id/edit" element={<EditTradingMachine />} />
                    <Route path="create" element={<CreateTradingMachine/>} />
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
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>)
  );
}

export default App;
