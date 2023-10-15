import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Products from "./pages/Comprar";
import LoginForm from "./pages/Login";
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
            <Route path="/login" element={<LoginForm />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
