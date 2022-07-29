import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Box } from "@mui/system";
import { Button, colors, TextField, Stack } from "@mui/material";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/config/firebase";
import { useLocation, useNavigate } from "react-router-dom";

const EditeArticle = () => {
  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (quill) {
      quill.root.innerHTML = state.body;
      setTitle(state.title);
    }
  }, [quill]);

  const handlePublishArticel = async () => {
    if (title === "") return;
    state.title = title;
    state.body = quill.root.innerHTML;

    const articelCollectionsRef = doc(db, "Articles", state.docID);
    updateDoc(articelCollectionsRef, state)
      .then(() => {
        quill.root.innerHTML = "";
        setTitle("");
        navigate("/dashboard", { replace: true });
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

export default EditeArticle;
