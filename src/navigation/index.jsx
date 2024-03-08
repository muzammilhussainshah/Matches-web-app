import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import { MainRoutes } from "./MainRoutes";
import { fetchMatches, fetchInterest } from '../../src/store/actions/action';
import { _retrieveData } from '../../src/services/assynsStorage';

export const Routing = () => {
  const dispatch = useDispatch();
  const items = JSON.parse(localStorage.getItem('isRemember'));
  useEffect(() => {
    dispatch(fetchMatches())
    dispatch(fetchInterest())
  }, [])
  return (
    <BrowserRouter>
      <>
        <AuthRoutes />
        <MainRoutes />
      </>
    </BrowserRouter>
  );
};
