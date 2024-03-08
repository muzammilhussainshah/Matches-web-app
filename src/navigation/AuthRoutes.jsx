import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { Signup } from "../screens/authentication/Signup";
import { Signin } from "../screens/authentication/Signin";
import { Forget } from "../screens/authentication/ForgetPassword";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Signin />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Forget" element={<Forget />} />
      </Route>
    </Routes>
  );
}
