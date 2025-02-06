import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import dos componentes de página
import HomePage from "../Pages/HomePage/HomePage";
import TipoEventoPage from "../Pages/TipoEventoPage/TipoEventoPage";
import EventosPage from "../Pages/EventosPage/EventosPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import TestPage from "../Pages/TestPage/TestPage";
import EventosAlunoPage from "../Pages/EventosAlunoPage/EventosAlunoPage";

import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { PrivateRoute } from "./PrivateRoute";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<HomePage />} path="/" exact />

        <Route
          path="/tipo-evento"
          element={
            <PrivateRoute redirectTo="/">
              <TipoEventoPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/eventos"
          element={
            <PrivateRoute redirectTo="/">
              <EventosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/eventos-aluno"
          element={
            <PrivateRoute>
              <EventosAlunoPage />
            </PrivateRoute>
          }
        />

        <Route element={<LoginPage />} path="/login" />
        <Route element={<TestPage />} path="/teste-page" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Rotas;
