import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "../css/Login.css";
import { onLoggingIn } from "../redux/features/authen/authenSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Copyright © Quizz {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const loading = useSelector((state) => state.auth.loading);
  const initialLoginValues = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const dispatch = useDispatch();

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(6, "Password must contain at least 6 characters")
      .max(20, "Password can not exceed 20 characters"),
  });

  const onSubmitLoginForm = async (values) => {
    dispatch(
      onLoggingIn({
        username: values.email,
        password: values.password,
      })
    );
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="div" maxWidth="xs">
          <Paper elevation={3} style={{ padding: "0px 20px 20px 20px" }}>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="div" noValidate sx={{ mt: 1 }}>
                <Formik
                  initialValues={initialLoginValues}
                  onSubmit={onSubmitLoginForm}
                  validationSchema={loginValidationSchema}
                >
                  {({ values, isSubmitting }) => {
                    console.log("values", values);
                    return (
                      <Form>
                        <Field
                          as={TextField}
                          margin="normal"
                          fullWidth
                          label="Email Address"
                          name="email"
                          autoFocus
                          variant="standard"
                          helperText={<ErrorMessage name="email" />}
                        />
                        <Field
                          as={TextField}
                          margin="normal"
                          variant="standard"
                          fullWidth
                          name="password"
                          label="Password"
                          id="password"
                          type="password"
                          helperText={<ErrorMessage name="password" />}
                        />
                        <Field
                          as={FormControlLabel}
                          control={
                            <Checkbox
                              color="primary"
                              checked={values.rememberMe}
                            />
                          }
                          label="Remember me"
                          name="rememberMe"
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          disabled={loading}
                        >
                          {loading ? "Loading" : "Sign In"}
                        </Button>
                      </Form>
                    );
                  }}
                </Formik>

                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="signUp" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
}
