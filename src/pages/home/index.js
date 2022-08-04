import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { Box, colors, Pagination, Stack } from "@mui/material";
import CardStyle from "./components/CardStyle";
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../lib/config/firebase";
import SkeletonCard from "./components/SkeletonCard";
import { useContextApi } from "../../lib/hooks/useContextApi";

const Home = () => {
  const navigate = useNavigate();
  const {allArticles, setAllArticles} = useContextApi()

  const [isDataAvaliable, setIsDataAvaliable] = useState(false);

  const handleNavigation = (data) => {
    navigate("/DetailArticle", { state: data });
  };

  useEffect(() => {
    const q = query(collection(db, "Articles"), where('isPublish', '==', true));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({docID : doc.id, ...doc.data()});
      });
      setAllArticles(data)
      setIsDataAvaliable(true)
    });
    return () => unsubscribe;
  }, []);

  return (
    <Box component="div" sx={{ backgroundColor: colors.grey[100] }}>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 5, mb: 20 }}>
        {isDataAvaliable &&
          allArticles.map((data) => (
            <CardStyle
              key={data.id}
              data={data}
              onClick={() => handleNavigation(data)}
            />
          ))}
        {!isDataAvaliable &&
          [1, 2, 3, 4, 5].map((value) => <SkeletonCard key={value} />)}
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;
