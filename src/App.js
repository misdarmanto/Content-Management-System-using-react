import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/404";
import Login from "./pages/auth/Login";
import Home from "./pages/home";
import { createTheme, ThemeProvider } from "@mui/system";
import { blue } from "@mui/material/colors";
import { ContextApi } from "./lib/helper/ContextApi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/config/firebase";
import Dashboard from "./pages/dashboard/Index";
import SignUp from "./pages/auth/SignUp";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);

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
        const userData = {
          displayName: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };
        setCurrentUserData(userData);
        setIsAuth(true);
      } else {
      }
    });
  }, []);

  return (
    <ContextApi.Provider
      value={{ isAuth, setIsAuth, currentUserData, setCurrentUserData }}
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          {!isAuth && (
            <>
              <Route path="Login" element={<Login />} />
              <Route path="SignUp" element={<SignUp />} />
            </>
          )}
          {isAuth && <Route path="dashboard" element={<Dashboard />} />}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ContextApi.Provider>
  );
}

export default App;
