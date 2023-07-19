import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import LoginRequireRoute from "utils/loginRequiredRoute";


function AccountRoutes() {
  return (
    <>
      <Routes>
        <Route element={<LoginRequireRoute />} >
          <Route path="profile" element={<Profile />} />
        </Route>
        {/* <Route path="profile" element={<Profile />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default AccountRoutes;