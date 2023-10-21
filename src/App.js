import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Products from "./pages/Comprar";
import ConsumoProductos from "./pages/Consumo";
import LoginForm from "./pages/Login";
import ConfirmaCompra from "./pages/Confirma-Compra";
import ProductsEdit from "./Admin/ComprarEdit";
import SubirCompra from "./Admin/Subir-Compra";
import Page404 from "./404";
// import FacturaComponent from "./pages/Factura";
import Layout from "./Layout";
import { UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      {/* el UserProvider aca envuelve todo */}
      <Router>
        <Routes>
          <Route index element={<IndexPage />} />
          <Route path="/" element={<Layout />}>
            <Route path="/comprar" element={<Products />} />
            <Route path="/consumo" element={<ConsumoProductos />} />
            <Route path="/comprar-edit" element={<ProductsEdit />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/confirma-compra/:id" element={<ConfirmaCompra />} />
            <Route path="/subir-hotel-destino" element={<SubirCompra />} />
            {/* <Route path="/comprobante-de-pago" element={<FacturaComponent />} /> */}
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
