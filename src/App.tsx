import { Refine, WelcomePage } from "@refinedev/core";
import "./App.css";
import dataProvider from "./providers/data-provider";
import ShowProduct from "./pages/Show";
import EditProduct from "./pages/Edit";
import ListProducts from "./pages/List";

function App() {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      <ListProducts />
    </Refine>
  );
}

export default App;
