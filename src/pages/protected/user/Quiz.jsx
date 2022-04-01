import React, { useEffect, useState } from "react";
import { CircularProgress, createTheme } from "@material-ui/core";
import { ThemeProvider, Card, Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Modal } from "antd";

import "antd/dist/antd.css";
import "../../../css/Quiz.css";
import useQuiz from "../../../customHook/useQuiz";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0168D4",
    },
  },
});
const answerIdx = [1, 2, 3, 4];
export default function Quiz() {
  const [currIdxOfQues, setCurrIdxOfQues] = useState(0);
  const { questions, fetchingQues, setSelectedAns } = useQuiz(currIdxOfQues);

  const increseCurrIdx = () => {
    if (currIdxOfQues < questions.length - 1) {
      setCurrIdxOfQues((idx) => idx + 1);
    }
  };
  const decCurrIdx = () => {
    if (currIdxOfQues >= 1) {
      setCurrIdxOfQues((idx) => idx - 1);
    }
  };
  useEffect(() => {}, [questions]);

  const onSubmitAns = () => {
    Modal.confirm({
      title: <div style={{ color: "red" }}>Submit</div>,
      content: (
        <div style={{ fontSize: "20px", fontWeight: 500 }}>
          Are you sure to submit your answer?
        </div>
      ),
      onOk: () => {
        console.log("questions", questions);
      },
      onCancel: () => {
        console.log("questions", questions);
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="quiz_container">
        <div className="quiz_content_wrapper">
          {fetchingQues ? (
            <div className="quiz_progress flexAndCenterAll">
              <CircularProgress size={150} />
            </div>
          ) : (
            <Card sx={{ maxWidth: "100%", px: 4, py: 2 }}>
              <CardContent>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography gutterBottom variant="h4" component="div">
                    Awesome Quiz Application
                  </Typography>
                  <div className="quiz_timeLeft">
                    <Typography gutterBottom variant="h6" component="div">
                      Time left:
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{
                        color: "white",
                        backgroundColor: "#353B40",
                        padding: "5px 10px 5px 10px",
                        borderRadius: "5px",
                      }}
                    >
                      {questions[currIdxOfQues]?.timeLeft}
                    </Typography>
                  </div>
                </Box>
                <hr></hr>
                <Typography
                  variant="h5"
                  component="div"
                  style={{ fontWeight: "bold", marginTop: "20px" }}
                >
                  {questions?.[currIdxOfQues]?.[`question`]}
                </Typography>
                <div className="quiz_answersContainer">
                  {answerIdx.map((idx, index) => {
                    return (
                      <div
                        onClick={() => {
                          if (questions?.[currIdxOfQues]?.timeLeft === 0) {
                            Modal.warning({
                              title: (
                                <div style={{ color: "red" }}>Time up</div>
                              ),
                              content: (
                                <div
                                  style={{ fontSize: "20px", fontWeight: 500 }}
                                >
                                  Can not change your answer because you have
                                  run out of time.
                                </div>
                              ),
                            });
                          } else {
                            setSelectedAns(
                              idx,
                              questions?.[currIdxOfQues]?.[`answer${idx}`]
                            );
                          }
                        }}
                        key={index}
                        className={`quiz_answerContainer fontS20FontW500 ${
                          idx === questions[currIdxOfQues]?.userAnswerIdx &&
                          "quiz_answerSelected"
                        }`}
                      >
                        {questions?.[currIdxOfQues]?.[`answer${idx}`]}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              <hr></hr>
              <div className="quiz_footer flexSpaceBetween">
                <div className="fontS20FontW500">
                  {currIdxOfQues + 1} of {questions.length} questions
                </div>
                <div className="quiz_btns flexSpaceBetween">
                  <Button
                    onClick={decCurrIdx}
                    variant="contained"
                    size="small"
                    disabled={currIdxOfQues === 0}
                  >
                    Previous
                  </Button>
                  {currIdxOfQues === questions.length - 1 ? (
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={onSubmitAns}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      onClick={increseCurrIdx}
                      variant="contained"
                      size="small"
                      color="primary"
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
