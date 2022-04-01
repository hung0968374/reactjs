import React from "react";
import { createTheme } from "@material-ui/core";
import { ThemeProvider, Card, Box } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../../css/Quiz.css";

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

export default function Quiz() {
  const answers = [1, 2, 3, 4];
  return (
    <ThemeProvider theme={theme}>
      <div className="quiz_container">
        <div className="quiz_content_wrapper">
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
                    15
                  </Typography>
                </div>
              </Box>
              <hr></hr>
              <Typography
                variant="h5"
                component="div"
                style={{ fontWeight: "bold", marginTop: "20px" }}
              >
                what does HTML stand for
              </Typography>
              <div className="quiz_answersContainer">
                {answers.map((answer, index) => {
                  return (
                    <div
                      className={`quiz_answerContainer fontS20FontW500 ${
                        index === 1 && "quiz_answerSelected"
                      }`}
                    >
                      answer {index}
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <hr></hr>
            <div className="quiz_footer flexSpaceBetween">
              <div className="fontS20FontW500">2 of 5 questions</div>
              <div className="quiz_btns flexSpaceBetween">
                <Button variant="contained" size="small">
                  Previous
                </Button>
                <Button variant="contained" size="small" color="primary">
                  Next
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}
