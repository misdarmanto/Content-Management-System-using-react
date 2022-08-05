import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

import {
  collection,
  query,
  getDocs,
  updateDoc,
  deleteDoc,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../../lib/config/firebase";
import { useContextApi } from "../../../lib/hooks/useContextApi";
import { colors, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import DataEmptyAnimation from "./DataEmptyAnimation";
import PublicIcon from "@mui/icons-material/Public";
import DraftsRoundedIcon from "@mui/icons-material/DraftsRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const MyArticle = () => {
  const { currentUserID } = useContextApi();
  const [listArticles, setListArticles] = useState([]);
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = (data) => {
    navigate("/EditeArticle", { state: data });
  };

  const handlePopUp = () => {
    setOpenPopUp(!openPopUp);
  };

  useEffect(() => {
    const getListArticles = async () => {
      const q = query(
        collection(db, "Articles"),
        where("userID", "==", currentUserID)
      );
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ docID: doc.id, ...doc.data() });
      });
      setListArticles(data);
      setIsDataAvaliable(true);
    };
    getListArticles();
  }, []);

  const handleUpdate = async (docID, isPublish) => {
    const articleRef = doc(db, "Articles", docID);
    await updateDoc(articleRef, {
      isPublish: isPublish ? false : true,
    });
  };

  const handleDeleteArticle = async (docID) => {
    await deleteDoc(doc(db, "Articles", docID));
  };

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
        {listArticles.length === 0 && <DataEmptyAnimation />}
        {listArticles.length !== 0 &&
          listArticles.map((data, index) => (
            <Stack
              key={index}
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "self-start", sm: "center" }}
              justifyContent="space-between"
              sx={{
                border: "1px solid #e3e3e3",
                p: 1,
                mb: 3,
                borderRadius: "5px",
              }}
            >
              <Stack>
                <Typography fontWeight="bold" sx={{ color: colors.grey[500] }}>
                  {data.title.length >= 35
                    ? data.title.slice(0, 35) + "..."
                    : data.title}
                </Typography>
                <small style={{ color: "gray" }}>
                  {data.isPublish ? "publish" : "draf"} : {data.createdAt}
                </small>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Tooltip title="likes" placement="top">
                  <IconButton>
                    <FavoriteRoundedIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2" color="text.secondary">
                  {data.likes.length}
                </Typography>
                <Tooltip title="views" placement="top">
                  <IconButton>
                    <Visibility />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2" color="text.secondary">
                  {data.views}
                </Typography>
                <Tooltip title="comments" placement="top">
                  <IconButton>
                    <CommentIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2" color="text.secondary">
                  {data?.comments ? data?.comments.length : "0"}
                </Typography>

                <Stack direction="row" alignItems="center" mr={2} ml={2}>
                  <Tooltip title="delete" placement="top">
                    <IconButton onClick={handlePopUp}>
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Tooltip>

                  {data.isPublish ? (
                    <Tooltip title="publish" placement="top">
                      <IconButton
                        onClick={() => handleUpdate(data.docID, data.isPublish)}
                      >
                        <PublicIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="publish" placement="top">
                      <IconButton
                        onClick={() => handleUpdate(data.docID, data.isPublish)}
                      >
                        <DraftsRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="edit" placement="top">
                    <IconButton onClick={() => handleNavigation(data)}>
                      <CreateRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>

              <Dialog
                open={openPopUp}
                onClose={handlePopUp}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete Article"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    apakah anda yakin ingin menghapus artikel ini?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handlePopUp}>cancle</Button>
                  <Button onClick={() => handleDeleteArticle(data.docID)}>
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            </Stack>
          ))}
      </List>
    </Box>
  );
};

export default MyArticle;
