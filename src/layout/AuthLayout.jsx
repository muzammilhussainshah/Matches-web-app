import React, { Suspense, } from "react";
import { Navigate, Outlet, } from "react-router-dom";
import Loader from "../components/Loader";

export const AuthLayout = () => {
  const isLogin = false;
  return (
    <>
      <Suspense fallback={<Loader color="Green" />}>
        {isLogin ? <Navigate to={"/"} replace /> : <Outlet />}
      </Suspense>
    </>
  );
};
