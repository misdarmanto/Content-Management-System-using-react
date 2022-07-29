import React, { useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Box } from "@mui/system";
import { Button, colors, TextField, Stack } from "@mui/material";

import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../../lib/config/firebase";
import { useContextApi } from "../../../lib/hooks/useContextApi";

const CreateArticle = () => {
  const { quill, quillRef } = useQuill();
  const { currentUserData, currentUserID } = useContextApi();

  const [title, setTitle] = useState("");

  const handlePublishArticel = async () => {
    if (title === "") return;
    const contentHTML = quill.root.innerHTML;

    const articelCollectionsRef = doc(collection(db, "Articles"));
    const date = new Date();

    const data = {
      id: Date.now(),
      userID: currentUserID,
      title: title,
      thumbnail: "",
      createdAt: date.toDateString(),
      author: currentUserData.displayName,
      photo: currentUserData.photo,
      body: contentHTML,
      likes: [],
      views: 0,
    };
    setDoc(articelCollectionsRef, data)
      .then(() => {
        quill.root.innerHTML = "";
        setTitle("");
        console.log("ok");
      })
      .catch((e) => console.error(e));
  };

  return (
    <Box
      sx={{
        width: {
          sx: 400,
          sm: 600,
          md: 700,
        },
        backgroundColor: colors.common.white,
        minHeight: 500,
        margin: "auto",
        p: 5,
      }}
    >
      <TextField
        sx={{ mb: 2 }}
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        id="outlined-basic"
        label="Title"
        variant="outlined"
      />
      <div ref={quillRef} style={{ minHeight: "250px" }} />
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ mt: 2 }}
        spacing={2}
      >
        <Button variant="outlined">Draf</Button>
        <Button variant="outlined" onClick={handlePublishArticel}>
          Publish
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateArticle;
