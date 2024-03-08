import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Matches from "../screens/matches/matches";
import Interest from "../screens/interest/interest";

export const MainRoutes = () => {
  const items = JSON.parse(localStorage.getItem('isRemember'));

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* {
          items && <Route path="/" element={<Matches />} />
        } */}
        <Route path="/matches" element={<Matches />} />
        <Route path="/interest" element={<Interest />} />
      </Route>
    </Routes>
  );
};
