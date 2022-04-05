import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal } from "antd";
import * as Yup from "yup";

import "../../../../css/Dashboard.css";
import "antd/dist/antd.css";
import { api_admin_updateUser, api_admin_createNewUser } from "../../../../api";

export default function HandleUserModal({
  isAddingUser,
  setIsAddingUser,
  datas,
  setDatas,
  dataForModal = {},
  isUpdatingUser,
  setIsUpdatingUser,
}) {
  const [submitting, setSubmitting] = useState(false);

  const initialValues = isAddingUser
    ? {
        username: "",
        password: "",
        email: "",
        role: "",
        avatar: "",
      }
    : dataForModal;

  const validateUserInfo = Yup.object().shape({
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
    role: Yup.string()
      .oneOf(["user", "admin"], `Role must be "admin" or "user"`)
      .required("This field is required"),
    avatar: Yup.string().required("This field is required"),
  });

  const handleSubmit = async (values, props) => {
    if (isAddingUser) {
      try {
        setSubmitting(true);
        const param = { ...values };
        delete param.avatar;
        const response = await api_admin_createNewUser(param);
        const newRow = Object.keys(response.data).map((key) => {
          return response.data[key];
        });
        const newDatas = [...datas, newRow];
        setDatas(newDatas);
        Modal.success({
          title: "Success",
          content: "A new user has been created successfully.",
        });
      } catch (error) {
        if (error.response.status === 400) {
          Modal.error({
            title: <div style={{ color: "red" }}> Failed</div>,
            content: (
              <>
                {error.response.data.message.split(",").map((el) => {
                  return <div>{el}</div>;
                })}
              </>
            ),
          });
        }
      } finally {
        setSubmitting(false);
        setIsAddingUser(false);
        props.resetForm();
      }
      return;
    } else if (isUpdatingUser) {
      try {
        setSubmitting(true);
        const param = { avatar: values.avatar };
        const response = await api_admin_updateUser(values.id, param);

        const newDatas = datas.map((data) => {
          if (data[6] !== response.data.id) {
            return data;
          } else {
            return Object.values(response.data);
          }
        });
        setDatas(newDatas);
        Modal.success({
          title: "Success",
          content: "User selected has been updated successfully.",
        });
      } catch (error) {
        if (error.response.status === 400) {
          Modal.error({
            title: <div style={{ color: "red" }}> Failed</div>,
            content: (
              <>
                {error.response.data.message.split(",").map((el) => {
                  return <div>{el}</div>;
                })}
              </>
            ),
          });
        }
      } finally {
        setSubmitting(false);
        setIsUpdatingUser(false);
        props.resetForm();
      }
      return;
    } else {
      return;
    }
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validateUserInfo}
      >
        {(props) => {
          return (
            <Form>
              <Modal
                width="700px"
                title={
                  <div style={{ color: "red" }}>
                    {isAddingUser ? "Add new user" : "Update user"}
                  </div>
                }
                visible={isAddingUser || isUpdatingUser}
                onCancel={() => {
                  setIsAddingUser(false);
                  setIsUpdatingUser(false);
                }}
                onOk={() => {
                  props.submitForm();
                }}
                okText={isAddingUser ? "Add new user" : "Update user"}
                confirmLoading={submitting}
              >
                <Box component="div">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        margin="normal"
                        fullWidth
                        name="username"
                        label="Username"
                        value={props.values.username}
                        disabled={isUpdatingUser}
                        helperText={<ErrorMessage name="username" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        margin="normal"
                        padding="normal"
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        value={props.values.password}
                        disabled={isUpdatingUser}
                        helperText={<ErrorMessage name="password" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        margin="normal"
                        padding="normal"
                        fullWidth
                        label="Role"
                        name="role"
                        value={props.values.role}
                        disabled={isUpdatingUser}
                        helperText={<ErrorMessage name="role" />}
                      ></Field>
                    </Grid>
                    <Grid item xs={12} sm={isUpdatingUser ? 6 : 12}>
                      <Field
                        as={TextField}
                        margin="normal"
                        fullWidth
                        label="Email"
                        name="email"
                        value={props.values.email}
                        disabled={isUpdatingUser}
                        helperText={<ErrorMessage name="email" />}
                      />
                    </Grid>
                    {isUpdatingUser && (
                      <Grid item xs={12} sm={6}>
                        <Field
                          as={TextField}
                          margin="normal"
                          fullWidth
                          label="Avatar"
                          name="avatar"
                          value={props.values.avatar}
                          helperText={<ErrorMessage name="avatar" />}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Modal>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
