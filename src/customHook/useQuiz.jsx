import { useState, useEffect } from "react";
import { api_getQuestions } from "../api";

export default function useQuiz(currIdxOfQues) {
  const [questions, setQuestions] = useState([]);
  const [fetchingQues, setFetchingQues] = useState(false);

  const fetchQuestions = async () => {
    setFetchingQues(true);
    const response = await api_getQuestions();
    const datas = response.data.results;
    const questionsWithTimer = datas.map((el) => {
      return { ...el, timeLeft: 15 };
    });
    setQuestions(questionsWithTimer);
    setFetchingQues(false);
  };
  useEffect(() => {
    setTimeout(() => {
      fetchQuestions();
    }, 200);
  }, []);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (questions.length > 0) {
        if (questions[currIdxOfQues].timeLeft >= 1) {
          console.log("questions", questions);
          questions[currIdxOfQues].timeLeft -= 1;
          setQuestions(questions);
        }
      }
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [questions, currIdxOfQues]);
  return { questions, fetchingQues };
}
