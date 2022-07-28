import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

import { collectionGroup, query, getDocs } from "firebase/firestore";
import { db } from "../../../lib/config/firebase";
import { useContextApi } from "../../../lib/hooks/useContextApi";
import { colors, IconButton, Stack, Typography } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CommentIcon from "@mui/icons-material/Comment";

const MyArticel = () => {
  const { currentUserID } = useContextApi();
  const [listArticles, setListArticles] = useState([]);
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);

  useEffect(() => {
    const getListArticles = async () => {
      const q = query(collectionGroup(db, "Articels"));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      const filterData = data.filter((value) => value.userID === currentUserID);
      setListArticles(filterData);
      setIsDataAvaliable(true);
    };
    getListArticles();
  }, []);

  if (!isDataAvaliable) return "";

  return (
    <Box
      sx={{
        width: {
          sx: 400,
          sm: 600,
          md: 700,
        },
        bgcolor: "background.paper",
        minHeight: 500,
        margin: "auto",
        p: 2,
      }}
    >
      <List>
        {listArticles.length === 0 && <h1>No Articel</h1>}
        {listArticles.length !== 0 &&
          listArticles.map((data, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                border: "1px solid #e3e3e3",
                p: 1,
                mb: 3,
                borderRadius: "10px",
              }}
            >
              <Typography fontWeight="bold" sx={{ color: colors.grey[500] }}>
                {data.title.length >= 35
                  ? data.title.slice(0, 35) + "..."
                  : data.title}
              </Typography>
              <Stack direction="row" alignItems="center">
                <IconButton>
                  <FavoriteRoundedIcon />
                </IconButton>
                <IconButton>
                  <Visibility />
                </IconButton>
                <IconButton>
                  <CommentIcon />
                </IconButton>
                <IconButton>
                  <CreateRoundedIcon />
                </IconButton>
              </Stack>
            </Stack>
          ))}
      </List>
    </Box>
  );
};

export default MyArticel;
