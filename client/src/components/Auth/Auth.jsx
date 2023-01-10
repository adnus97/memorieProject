import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Grid, Typography, Container, TextField, Button } from "@mui/material";
import {
  AvatarComp,
  Form,
  ChangeFormButton,
  PaperComp,
  SubmitButton,
} from "./styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/features/userSlice";

import { useNavigate } from "react-router-dom";
import { useSignInMutation, useSignUpMutation } from "../../redux/services/api";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleSucces = async (res) => {
    const decoded = {
      result: { ...jwt_decode(res.credential) },
      token: res.credential,
    };
    try {
      dispatch(getUser(decoded));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const googleFailure = (err) => console.log(err);
  const [signUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      signUp(formData)
        .then((res) => dispatch(getUser(res.data)))
        .then((res) => (res.payload ? navigate("/") : ""));
    } else {
      signIn(formData)
        .then((res) => dispatch(getUser(res.data)))
        .then((res) => (res.payload ? navigate("/") : ""));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignup((prevState) => !prevState);
    setShowPassword(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <PaperComp elevation={3}>
        <AvatarComp>
          <LockOutlinedIcon />
        </AvatarComp>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </SubmitButton>
          <Grid item>
            {/* <GoogleButton
              fullWidth
              variant="contained"
              color="primary"
              //onClick={login}
            >
              <GoogleIcon />
              &nbsp; Continue with Google
            </GoogleButton> */}
            <GoogleLogin
              onSuccess={googleSucces}
              onError={googleFailure}
              theme="filled_blue"
              shape="square"
            />
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <ChangeFormButton onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </ChangeFormButton>
            </Grid>
          </Grid>
        </Form>
      </PaperComp>
    </Container>
  );
};
