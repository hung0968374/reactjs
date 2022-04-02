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
import { api_submitQuestions } from "../../../api";

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
  const {
    questions,
    fetchingQues,
    setSelectedAns,
    userAnswers,
    fetchQuestions,
    revealCorrectAns,
  } = useQuiz(currIdxOfQues);
  const [questionSubmitted, setQuestionSubmitted] = useState(false);

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

  const submittedAns = () => {
    fetchQuestions();
    setCurrIdxOfQues(0);
    setQuestionSubmitted(false);
  };

  const onSubmitAns = () => {
    Modal.confirm({
      title: <div style={{ color: "red" }}>Submit</div>,
      content: (
        <div style={{ fontSize: "20px", fontWeight: 500 }}>
          Are you sure to submit your answer?
        </div>
      ),
      onOk: async () => {
        setQuestionSubmitted(true);
        const params = userAnswers.map((ans) => {
          return {
            id: ans.id,
            correctanswer: ans.userAnswerText || "correctAns",
          };
        });
        try {
          const response = await api_submitQuestions(params);
          console.log("response", response);
          const amountOfCorrectAns = response.data.reduce((prev, curr) => {
            if (curr.result === true) {
              return (prev += 1);
            }
            return prev;
          }, 0);
          revealCorrectAns(response.data);

          Modal.confirm({
            title: <div style={{ color: "red" }}>Result</div>,
            content: (
              <div style={{ fontSize: "20px", fontWeight: 500 }}>
                You scored {amountOfCorrectAns} out of {questions.length}?
              </div>
            ),
            okText: "Start new quiz",
            onOk: () => {
              submittedAns();
            },
          });
        } catch (error) {
          console.log("error", error.response);
        }
      },
    });
  };

  const chooseAnswer = (idx) => {
    if (questions?.[currIdxOfQues]?.timeLeft === 0) {
      Modal.warning({
        title: <div style={{ color: "red" }}>Time up</div>,
        content: (
          <div style={{ fontSize: "20px", fontWeight: 500 }}>
            Can not change your answer because you have run out of time.
          </div>
        ),
      });
    } else if (questionSubmitted) {
      Modal.warning({
        title: <div style={{ color: "red" }}>Restricted</div>,
        content: (
          <div style={{ fontSize: "20px", fontWeight: 500 }}>
            You have submitted your answers.
          </div>
        ),
      });
    } else {
      setSelectedAns(idx, questions?.[currIdxOfQues]?.[`answer${idx}`]);
    }
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
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    style={{ fontWeight: 700, color: "red" }}
                  >
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
                        onClick={() => chooseAnswer(idx)}
                        key={index}
                        className={`quiz_answerContainer fontS20FontW500 ${
                          !questionSubmitted &&
                          userAnswers?.length > 0 &&
                          idx === userAnswers?.[currIdxOfQues]?.userAnswerIdx &&
                          "quiz_answerSelected"
                        }
                        ${
                          questionSubmitted &&
                          questions?.[currIdxOfQues]?.[`answer${idx}`] ===
                            questions?.[currIdxOfQues]?.correctAns &&
                          "quiz_trueAns"
                        } 
                        ${
                          questionSubmitted &&
                          questions?.[currIdxOfQues]?.result === false &&
                          userAnswers?.[currIdxOfQues]?.userAnswerIdx === idx &&
                          "quiz_falseAns"
                        }
                        `}
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
                <div
                  className={`${
                    questionSubmitted && currIdxOfQues === questions.length - 1
                      ? "quiz_bttnsSubmitted"
                      : "quiz_btns"
                  } flexSpaceBetween`}
                >
                  <Button
                    onClick={decCurrIdx}
                    variant="contained"
                    size="small"
                    disabled={currIdxOfQues === 0}
                  >
                    Previous
                  </Button>
                  {currIdxOfQues === questions.length - 1 ? (
                    <>
                      {questionSubmitted === false ? (
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
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={submittedAns}
                        >
                          Start new quiz
                        </Button>
                      )}
                    </>
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
