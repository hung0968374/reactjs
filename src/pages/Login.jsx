import * as React from "react";

// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
  const initialLoginValues = {
    email: "",
    password: "",
    rememberMe: true,
  };
  const onSubmitLoginForm = (values, props) => {
    console.log("values", values);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(6, "Password must contain at least 6 characters")
      .max(20, "Password can not exceed 20 characters"),
  });
  return (
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
                {(props) => {
                  console.log("props", props);
                  return (
                    <Form>
                      <Field
                        as={TextField}
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        helperText={<ErrorMessage name="password" />}
                      />
                      <Field
                        as={FormControlLabel}
                        control={
                          <Checkbox
                            color="primary"
                            checked={props.rememberMe}
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
                        disabled={props.isSubmitting}
                      >
                        {props.isSubmitting ? "Loading" : "Sign In"}
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
                  <Link href="#" variant="body2">
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
  );
}
