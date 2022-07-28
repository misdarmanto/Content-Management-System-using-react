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

const Home = () => {
  const [articel, setArticel] = useState([]);
  const navigate = useNavigate();

  const handleNavigation = (data) => {
    navigate("/DetailArticel", { state: data });
  };

  useEffect(() => {
    const q = query(collection(db, "Articels"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setArticel(data)
    });
    return () => unsubscribe;
  }, []);

  return (
    <Box component="div" sx={{ backgroundColor: colors.grey[100] }}>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 5, mb: 20 }}>
        {articel.map((data) => (
          <CardStyle
            key={data.id}
            data={data}
            onClick={() => handleNavigation(data)}
          />
        ))}
      </Container>
      <Stack justifyContent="center" alignItems="center" m={5}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
      <Footer />
    </Box>
  );
};

export default Home;
