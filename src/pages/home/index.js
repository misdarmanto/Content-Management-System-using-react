import { Container } from "@mui/system";
import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { Box, colors, Pagination, Stack } from "@mui/material";
import CardStyle from "./components/CardStyle";
import { articelData } from "./articelData";

const Home = () => {
  return (
    <Box component="div" sx={{ backgroundColor: colors.grey[50] }}>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 5, mb: 20 }}>
        {articelData.map((data, index) => (
          <CardStyle key={index} data={data.articel} />
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
