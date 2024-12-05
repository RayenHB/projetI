// src/components/Layout.js

import React, { Fragment } from "react";
import Header from "./header";
import Routers from "./routers";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <div>
        <Routers />
      </div>
    </Fragment>
  );
};

export default Layout;
