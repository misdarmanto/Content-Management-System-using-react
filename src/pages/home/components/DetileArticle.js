import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import { colors } from "@mui/material";
import { blue } from "@mui/material/colors";

import {
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../../lib/config/firebase";
import { useContextApi } from "../../../lib/hooks/useContextApi";
import { generateRandomColors } from "../../../lib/functions/generateColor";

const DetailArticle = () => {
  const { state } = useLocation();
  const textRef = useRef();
  const { currentUserID } = useContextApi();

  const [isUserAlreadyLike, setIsUserAlreadyLike] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleIncrementLike = async () => {
    const docArticleRef = doc(db, "Articles", state.docID);

    if (isUserAlreadyLike) {
      await updateDoc(docArticleRef, {
        likes: arrayRemove(currentUserID),
      });
      setIsUserAlreadyLike(false);
      setLikes(likes - 1);
    } else {
      await updateDoc(docArticleRef, {
        likes: arrayUnion(currentUserID),
      });
      setIsUserAlreadyLike(true);
      setLikes(likes + 1);
    }
  };

  const handleIncrementView = async () => {
    const docArticleRef = doc(db, "Articles", state.docID);
    await updateDoc(docArticleRef, {
      views: increment(1),
    });
  };

  useEffect(() => {
    const isTrue = state.likes.includes(currentUserID);
    setIsUserAlreadyLike(isTrue);
    setLikes(state.likes.length);
  }, []);

  let isFirstLoad = true;
  useEffect(() => {
    textRef.current.innerHTML = state.body;
    return () => {
      if (!isFirstLoad) {
        handleIncrementView();
      }
      isFirstLoad = false;
    };
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
            <Avatar
              sx={{
                bgcolor: generateRandomColors(state.author[0].toUpperCase()),
              }}
            >
              {state.author[0].toUpperCase()}
            </Avatar>
            <div>
              <Typography variant="h6" fontWeight="bold">
                {state.author}
              </Typography>
              <small>{state.createdAt}</small>
            </div>
          </Stack>
        </div>

        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton aria-label="likes" onClick={handleIncrementLike}>
            <FavoriteIcon
              sx={{
                color: isUserAlreadyLike ? colors.red[500] : colors.grey[500],
              }}
            />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {likes}
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
        <img src={state.thumbnail} style={{ height: "250px", width: "100%" }} />
      )}
      <p ref={textRef}></p>
    </Container>
  );
};

export default DetailArticle;
