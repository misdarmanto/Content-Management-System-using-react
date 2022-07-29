import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { Box, colors, Pagination, Stack } from "@mui/material";
import CardStyle from "./components/CardStyle";
import { articelData } from "./articelData";
import { useNavigate } from "react-router-dom";
import { collection, where, query, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/config/firebase";
import SkeletonCard from "./components/SkeletonCard";

const Home = () => {
  const navigate = useNavigate();

  const [articel, setArticel] = useState([]);
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);

  const handleNavigation = (data) => {
    navigate("/DetailArticle", { state: data });
  };

  useEffect(() => {
    const q = query(collection(db, "Articles"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({docID : doc.id, ...doc.data()});
      });
      setArticel(data);
      setIsDataAvaliable(true)
    });
    return () => unsubscribe;
  }, []);

  return (
    <Box component="div" sx={{ backgroundColor: colors.grey[100] }}>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 5, mb: 20 }}>
        {isDataAvaliable &&
          articel.map((data) => (
            <CardStyle
              key={data.id}
              data={data}
              onClick={() => handleNavigation(data)}
            />
          ))}
        {!isDataAvaliable &&
          [1, 2, 3, 4, 5].map((value) => <SkeletonCard key={value} />)}
      </Container>
      <Stack justifyContent="center" alignItems="center" m={5}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
      <Footer />
    </Box>
  );
};

export default Home;
