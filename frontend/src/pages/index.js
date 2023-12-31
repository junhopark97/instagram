import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "components/AppLayout";
import Home from "./Home";
import About from "./About";
import AccountRoutes from "./accounts";
import LoginRequireRoute from "utils/loginRequiredRoute";

function Root() {
  return (
    <AppLayout>
      <Routes>
        <Route element={<LoginRequireRoute />} >
          <Route path="/" element={<Home />} />
        </Route>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/accounts/*" element={<AccountRoutes />} />
      </Routes>
    </AppLayout>
  )
}

export default Root;