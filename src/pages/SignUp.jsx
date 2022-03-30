import * as React from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Modal } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "antd/dist/antd.css";
import { api_register } from "../api";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const initialSignUpValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const signUpValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Password must contain at least 8 characters")
      .max(20, "Password can not exceed 20 characters")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        "Password must contain at least one char and one number"
      ),
    username: Yup.string()
      .required("This field is required")
      .min(6, "User name must contain at least 6 characters")
      .max(20, "User name can not exceed 20 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("This field is required"),
  });

  const onSubmitSignUpForm = async (values, props) => {
    const params = {
      username: values.username,
      password: values.password,
      email: values.email,
    };
    try {
      await api_register(params);
      Modal.success({
        title: "Success",
        content: "Your account has been created",
        onOk: () => {
          navigate("/login");
        },
      });
    } catch (error) {
      Modal.error({
        title: "Register failed",
        content: error.response.data.message,
      });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} style={{ padding: "0px 20px 20px 20px" }}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="div" noValidate sx={{ mt: 3 }}>
              <Formik
                initialValues={initialSignUpValues}
                onSubmit={onSubmitSignUpForm}
                validationSchema={signUpValidationSchema}
              >
                {({ values }) => {
                  return (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            margin="normal"
                            fullWidth
                            label="Username"
                            name="username"
                            autoComplete="family-name"
                            helperText={<ErrorMessage name="username" />}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            margin="normal"
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            helperText={<ErrorMessage name="email" />}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                            helperText={<ErrorMessage name="password" />}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            margin="normal"
                            fullWidth
                            name="confirmPassword"
                            label="Confirm password"
                            type="password"
                            autoComplete="new-password"
                            helperText={<ErrorMessage name="confirmPassword" />}
                          />
                        </Grid>
                      </Grid>

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign Up
                      </Button>
                    </Form>
                  );
                }}
              </Formik>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
