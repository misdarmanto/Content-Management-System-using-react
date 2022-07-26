import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/404";
import Login from "./pages/auth/Login";
import SignIn from "./pages/auth/SignUp";
import DashBoard from "./pages/dashboard/Index";
import Home from "./pages/home";
import { createTheme, ThemeProvider } from "@mui/system";
import { blue } from "@mui/material/colors";
import { ContextApi } from "./lib/helper/ContextApi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/config/firebase";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
    },
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
      }
    });
  }, []);

  return (
    <ContextApi.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          {isAuth && <Route path="Dashboard" element={<DashBoard />} />}
          <Route path="Login" element={<Login />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ContextApi.Provider>
  );
}

export default App;
