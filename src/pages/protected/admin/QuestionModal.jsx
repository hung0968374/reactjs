import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field } from "formik";
import { Modal } from "antd";
import "../../../css/Dashboard.css";
import "antd/dist/antd.css";
import { api_admin_createNewQues } from "../../../api";

export default function QuestionModal({
  addQuesModal,
  setAddQuesModal,
  datas,
  setDatas,
  dataForModal = {},
  updateQuesModal,
  setUpdateQuesModal,
}) {
  const [submitting, setSubmitting] = useState(false);

  const initialValues = addQuesModal
    ? {
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        correctanswer: "",
      }
    : dataForModal;
  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      const response = await api_admin_createNewQues(values);
      const newRow = Object.keys(response.data).map((key) => {
        return response.data[key];
      });
      const newDatas = [...datas, newRow];
      setDatas(newDatas);
      Modal.success({
        title: "Success",
        content: "A new question has been created successfully.",
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
      setAddQuesModal(false);
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(props) => {
        console.log("initialValues", initialValues);
        console.log("props", props);
        return (
          <Form>
            <Modal
              width="700px"
              title={
                <div style={{ color: "red" }}>
                  {addQuesModal ? "Add new question" : "Update question"}
                </div>
              }
              visible={addQuesModal || updateQuesModal}
              onCancel={() => {
                setAddQuesModal(false);
                setUpdateQuesModal(false);
              }}
              onOk={() => {
                props.submitForm();
              }}
              okText={addQuesModal ? "Add new question" : "Update question"}
              confirmLoading={submitting}
            >
              <Box component="div">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      name="question"
                      label="Question"
                      // value={values.question}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      margin="normal"
                      padding="normal"
                      fullWidth
                      label="Answer1"
                      name="answer1"
                      // // value={values.answer1}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      label="Answer2"
                      name="answer2"
                      // // value={values.answer2}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      margin="normal"
                      padding="normal"
                      fullWidth
                      label="Answer3"
                      name="answer3"
                      // // value={values.answer3}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      label="Answer4"
                      name="answer4"
                      // // value={values.answer4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      name="correctanswer"
                      label="Correct Answer"
                      // // value={values.correctanswer}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Modal>
          </Form>
        );
      }}
    </Formik>
  );
}
