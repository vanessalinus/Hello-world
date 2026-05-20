import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Customers } from "./pages/Customers";
import { Dashboard } from "./pages/Dashboard";
import { Fleet } from "./pages/Fleet";
import { Inventory } from "./pages/Inventory";
import { Orders } from "./pages/Orders";
import { Shipments } from "./pages/Shipments";
import { Warehouses } from "./pages/Warehouses";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="warehouses" element={<Warehouses />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="orders" element={<Orders />} />
        <Route path="shipments" element={<Shipments />} />
        <Route path="fleet" element={<Fleet />} />
        <Route path="customers" element={<Customers />} />
      </Route>
    </Routes>
  );
}
