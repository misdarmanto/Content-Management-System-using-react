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
import FaceIcon from "@mui/icons-material/Face";
import GoogleIcon from "@mui/icons-material/Google";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/config/firebase";
import { useContextApi } from "../../lib/hooks/useContextApi";
import LoadingAnimation from "../../components/LoadingAnimation";

const Login = () => {
  const { setIsAuth, setCurrentUserData, setCurrentUserID } = useContextApi();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowpassword(!showPassword);
  };

  const handleLogin = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          displayName: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };
        setCurrentUserData(userData);
        setCurrentUserID(user.email);
        setIsLoading(false);
        setIsAuth(true);
        navigate("/Dashboard");
      })
      .catch((error) => {
        console.warn(error)
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  };

  const createUserDB = async (data, userID) => {
    const userCollectionsRef = doc(db, "Users", userID);
    setDoc(userCollectionsRef, data);
  };

  const handleSignUpWithGoogle = () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userData = {
          displayName: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };
        setCurrentUserData(userData);
        setCurrentUserID(user.email);
        createUserDB(userData, user.email);
        setIsLoading(false);
        setIsAuth(true);
        navigate("/Dashboard");
      })
      .catch((error) => {
        console.warn(error)
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const handleLoginAnonymouse = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, "anonymouse@mail.com", "qwerty")
      .then((userCredential) => {
        const userData = {
          displayName: "Anonymouse",
          email: "anonymouse@mail.com",
          photo: "",
        };
        setCurrentUserData(userData);
        setCurrentUserID("anonymouse@mail.com");
        setIsLoading(false);
        setIsAuth(true);
        navigate("/Dashboard");
      })
      .catch((error) => {
        console.warn(error)
        // const errorCode = error.code;
        // const errorMessage = error.message;
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
      {isLoading && <LoadingAnimation />}
      {!isLoading && (
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
            Login
          </Typography>

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
          <Button fullWidth variant="contained" onClick={handleLogin}>
            Login
          </Button>
          <Typography sx={{ mt: 2, color: colors.grey[700] }}>OR</Typography>
          <Button
            onClick={handleLoginAnonymouse}
            startIcon={<FaceIcon />}
            variant="outlined"
            sx={{ mt: 1, minWidth: "250px" }}
          >
            Anonymouse
          </Button>
          <Button
            onClick={handleSignUpWithGoogle}
            startIcon={<GoogleIcon />}
            variant="outlined"
            sx={{ mt: 2, minWidth: "250px" }}
          >
            Signin with google
          </Button>
          <Stack direction="row" mt={2} alignItems="center">
            <Typography sx={{ color: colors.grey[700] }}>
              Belum Punya Akun?
            </Typography>
            <Button onClick={() => navigate("/SignUp")}>SignUp</Button>
          </Stack>
        </Card>
      )}
    </div>
  );
};

export default Login;
