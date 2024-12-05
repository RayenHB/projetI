import React from "react";
import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Profilcli from "./profilcli";
import Profilpres from "./profilpres";
import Register from "./register";
const Routers = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/profilcli" element={<Profilcli />} />
      <Route path="/profilpres" element={<Profilpres />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routers;
