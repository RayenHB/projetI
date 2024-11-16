// src/components/Layout.js

import React, { Fragment } from "react";
import Header from "./header";
import Footer from "./footer";
import Routers from "./routers";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
