import { useState, useEffect, useRef, useCallback } from "react";
import { api_getQuestions } from "../api";

export default function useQuiz(currIdxOfQues) {
  const [questions, setQuestions] = useState([]);
  const [fetchingQues, setFetchingQues] = useState(false);

  const fetchQuestions = useCallback(async () => {
    setFetchingQues(true);
    const response = await api_getQuestions();
    const datas = response.data.results;

    const questionsWithTimer = datas.map((el) => {
      return {
        ...el,
        timeLeft: 15,
        userAnswerIdx: undefined,
        userAnswerText: "",
      };
    });

    setQuestions(questionsWithTimer);
    setFetchingQues(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchQuestions();
    }, 200);
  }, [fetchQuestions]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (questions.length > 0) {
        if (questions[currIdxOfQues].timeLeft >= 1) {
          const newQuestionTimer = (questions[currIdxOfQues].timeLeft -= 1);
          const newQuestion = {
            ...questions[currIdxOfQues],
            timeLeft: newQuestionTimer,
          };
          const newQues = questions.map((el, idx) => {
            if (currIdxOfQues !== idx) {
              return el;
            }
            return newQuestion;
          });
          setQuestions(newQues);
        }
      }
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [questions, currIdxOfQues]);

  const setSelectedAns = useCallback(
    (idx, ansText) => {
      const newQuestion = {
        ...questions[currIdxOfQues],
        userAnswerIdx: idx,
        userAnswerText: ansText,
      };
      const newQues = questions.map((el, idx) => {
        if (currIdxOfQues !== idx) {
          return el;
        }
        return newQuestion;
      });
      setQuestions(newQues);
    },
    [currIdxOfQues, questions]
  );
  return { questions, fetchingQues, setSelectedAns };
}
