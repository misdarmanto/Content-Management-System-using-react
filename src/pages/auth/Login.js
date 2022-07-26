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
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/config/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(null);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowpassword(!showPassword);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/Dashboard");
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
        <Button variant="outlined" sx={{ mt: 1, minWidth: "250px" }}>
          anonim
        </Button>
        <Button
          startIcon={<GoogleIcon />}
          variant="outlined"
          sx={{ mt: 2, minWidth: "250px" }}
        >
          Login with google
        </Button>
        <Stack direction="row" mt={2} alignItems="center">
          <Typography sx={{ color: colors.grey[700] }}>
            Belum Punya Akun?
          </Typography>
          <Button onClick={() => navigate("/signin")}>SignUp</Button>
        </Stack>
      </Card>
    </div>
  );
};

export default Login;
