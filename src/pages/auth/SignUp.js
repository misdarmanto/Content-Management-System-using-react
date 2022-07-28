import React, { useState } from "react";
import {
  Button,
  Card,
  colors,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/config/firebase";
import { useContextApi } from "../../lib/hooks/useContextApi";

const SignUp = () => {
  const { setIsAuth, setCurrentUserData } = useContextApi();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(null);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowpassword(!showPassword);
  };

  const createUserDB = async (data, userID) => {
    const userCollectionsRef = doc(db, "Users", userID);
    setDoc(userCollectionsRef, data);
  };

  const handleSignUp = () => {
    if (email === "" || password === "" || userName === "") {
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          displayName: userName,
          email: user.email,
          photo: user.photoURL,
        };
        setCurrentUserData(userData);
        createUserDB(userData, user.email);
        setIsAuth(true);
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: colors.grey[100],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          width: "450px",
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "25px",
          margin: "15px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: colors.blue[500],
            textAlign: "center",
            fontWeight: "bold",
            mb: 5,
          }}
        >
          SignUp
        </Typography>

        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <TextField
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            id="userName"
            label="User name"
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button fullWidth variant="contained" onClick={handleSignUp}>
          SignUp
        </Button>

        <Stack direction="row" mt={2} alignItems="center">
          <Typography sx={{ color: colors.grey[700] }}>
            Sudah Punya Akun?
          </Typography>
          <Button onClick={() => navigate("/Login")}>Login</Button>
        </Stack>
      </Card>
    </div>
  );
};

export default SignUp;
