import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IndexPage from "./routes/IndexPage";
import Sumate from "./routes/Sumate";
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
            <Route path="/suma-tu-servicio" element={<Sumate />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
