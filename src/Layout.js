import Header from "./Header";
import Footer from "./Footer";
// import Form from "./Form";
// import { NoticeAlert } from "./NoticeAlert";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main style={{ padding: '10px'}}>
      <Header />
      <>
        <br /> {/* Etiqueta <br> para salto de línea */}
        <br /> {/* Etiqueta <hr> para una línea horizontal */}
        <br /> {/* Etiqueta <br> para salto de línea */}
        <br /> {/* Etiqueta <hr> para una línea horizontal */}
        </>
      {/* <NoticeAlert /> */}
      <Outlet />
      <br />
      {/* <Form /> */}
      <Footer />
    </main>
  );
}