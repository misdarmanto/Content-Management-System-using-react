import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import { colors } from "@mui/material";

const CardStyle = ({ data }) => {
  return (
    <Card sx={{ mt: 5, mb: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar">
            {data.author[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader={data.createdAt}
      />
      <CardMedia
        component="img"
        height="194"
        image={data.thumbnail}
        alt="thumbnail"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.text}...
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="likes">
          <FavoriteIcon sx={{ color: colors.red[500] }} />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          454
        </Typography>

        <IconButton aria-label="views">
          <VisibilityIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          43
        </Typography>

        <IconButton aria-label="comments">
          <CommentIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          22
        </Typography>
      </CardActions>
    </Card>
  );
};

export default CardStyle;
