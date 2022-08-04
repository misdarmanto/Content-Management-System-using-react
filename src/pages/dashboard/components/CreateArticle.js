import React, { useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Box } from "@mui/system";
import { Button, colors, TextField, Stack, IconButton } from "@mui/material";

import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../../lib/config/firebase";
import { useContextApi } from "../../../lib/hooks/useContextApi";
import { storage } from "../../../lib/config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { PhotoCamera } from "@mui/icons-material";

const CreateArticle = () => {
  const { quill, quillRef } = useQuill();
  const { currentUserData, currentUserID } = useContextApi();

  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState(null);

  function handleChange(event) {
    const file = event.target.files[0];

    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const handleGetDOwnloadUrl = () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url);
        setImageURL(url);
      });
    };

    const handleGetPercent = (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(percent);
    };

    uploadTask.on(
      "state_changed",
      handleGetPercent,
      (err) => console.log(err),
      handleGetDOwnloadUrl
    );
  }

  const handlePublishArticel = async ({ isPublish }) => {
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
      isPublish: isPublish,
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
      <Box
        component={"div"}
        sx={{
          height: "100px",
          backgroundColor: "#F5F5F5",
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onChange={handleChange}
        >
          <input hidden accept="image/*" multiple type="file" />
          <PhotoCamera />
        </IconButton>
        <p>Thumbnail</p>
        {imageURL && <img src={imageURL} width={"200px"} height="100px" />}
      </Box>

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
        <Button
          variant="outlined"
          onClick={() => handlePublishArticel({ isPublish: false })}
        >
          Draf
        </Button>
        <Button
          variant="outlined"
          onClick={() => handlePublishArticel({ isPublish: true })}
        >
          Publish
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateArticle;
