import { Authenticated, Refine, WelcomePage } from "@refinedev/core";
import "./App.css";
import dataProvider from "./providers/data-provider";
import ShowProduct from "./pages/Show";
import EditProduct from "./pages/Edit";
import ListProducts from "./pages/List";
import CreateProduct from "./pages/Create";
import { authProvider } from "./providers/auth-provider";
import Login from "./components/Login";
import Header from "./components/Header";

function App() {
  return (
    <Refine dataProvider={dataProvider} authProvider={authProvider}>
      <Authenticated key="protected" fallback={<Login />}>
        <Header />
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}

export default App;
