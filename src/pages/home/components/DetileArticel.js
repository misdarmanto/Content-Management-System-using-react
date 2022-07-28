import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import { colors } from "@mui/material";

const DetailArticel = () => {
  const { state } = useLocation();
  const textRef = useRef();

  useEffect(() => {
    textRef.current.innerHTML = state.body;
  }, []);

  return (
    <Container maxWidth="md" sx={{ pt: 5, pb: 10 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        mb={5}
      >
        <div>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar>{state.author[0]}</Avatar>
            <div>
              <Typography variant="h6" fontWeight="bold">
                {state.author}
              </Typography>
              <small>{state.createdAt}</small>
            </div>
          </Stack>
        </div>

        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton aria-label="likes">
            <FavoriteIcon sx={{ color: colors.red[500] }} />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {state.likes}
          </Typography>
          <IconButton aria-label="views">
            <VisibilityIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {state.views}
          </Typography>

          <IconButton aria-label="comments">
            <CommentIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            22
          </Typography>
          <IconButton aria-label="comments">
            <ShareIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        {state.title}
      </Typography>
      {state.thumbnail !== "" && (
        <img src={state.thumbnail} style={{ height: "200px", width: "100%" }} />
      )}
      <p ref={textRef}></p>
    </Container>
  );
};

export default DetailArticel;
