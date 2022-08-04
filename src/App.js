import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/404";
import Login from "./pages/auth/Login";
import Home from "./pages/home";
import { ContextApi } from "./lib/helper/ContextApi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/config/firebase";
import Dashboard from "./pages/dashboard/Index";
import SignUp from "./pages/auth/SignUp";
import DetailArticle from "./pages/home/components/DetileArticle";
import EditeArticle from "./pages/dashboard/components/EditeArticle";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [currentUserID, setCurrentUserID] = useState(null);
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          displayName: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };
        setCurrentUserData(userData);
        setCurrentUserID(user.email);
        setIsAuth(true);
      } else {
      }
    });
  }, []);

  return (
    <ContextApi.Provider
      value={{
        isAuth,
        setIsAuth,
        currentUserData,
        setCurrentUserData,
        currentUserID,
        setCurrentUserID,
        allArticles,
        setAllArticles,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="DetailArticle" element={<DetailArticle />} />

          {!isAuth && (
            <>
              <Route path="Login" element={<Login />} />
              <Route path="SignUp" element={<SignUp />} />
            </>
          )}
          {isAuth && (
            <>
              <Route path="EditeArticle" element={<EditeArticle />} />
              <Route path="dashboard" element={<Dashboard />} />
            </>
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ContextApi.Provider>
  );
}

export default App;
