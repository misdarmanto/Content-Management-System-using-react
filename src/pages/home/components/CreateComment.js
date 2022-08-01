import React, { useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Box } from "@mui/system";
import { Button, colors, Stack, Typography } from "@mui/material";

import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../lib/config/firebase";
import { useContextApi } from "../../../lib/hooks/useContextApi";
import { useNavigate } from "react-router-dom";

const CreateComment = ({ docID }) => {
  const navigate = useNavigate()
  const { quill, quillRef } = useQuill();
  const { currentUserData, currentUserID, isAuth } = useContextApi();

  const handleSendComment = async () => {
    if (!isAuth) {
      navigate("/login")
      return;
    }

    const contentHTML = quill.root.innerHTML;

    const docArticleRef = doc(db, "Articles", docID);
    const date = new Date();

    const data = {
      userID: currentUserID,
      createdAt: date.toDateString(),
      author: currentUserData.displayName || "Anonymouse",
      photo: currentUserData.photo,
      comment: contentHTML,
    };

    await updateDoc(docArticleRef, {
      comments: arrayUnion(data),
    })
      .then(() => {
        quill.root.innerHTML = "";
        console.log("ok");
      })
      .catch((e) => console.error(e));
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.common.white,
        minHeight: { xs: 100, sm: 250},
        mt: 5,
      }}
    >
      <Typography sx={{ fontWeight: "bold", mb: 5 }}>
        Leave a Comment
      </Typography>
      <div ref={quillRef} style={{ minHeight: "250px" }} />
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ mt: 2 }}
        spacing={2}
      >
        <Button variant="outlined" onClick={handleSendComment}>
          Send
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateComment;
