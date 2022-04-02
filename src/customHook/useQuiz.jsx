import { useState, useEffect, useCallback } from "react";
import { api_getQuestions } from "../api";

export default function useQuiz(currIdxOfQues) {
  const [questions, setQuestions] = useState([]);
  const [fetchingQues, setFetchingQues] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const fetchQuestions = useCallback(async () => {
    setFetchingQues(true);
    const response = await api_getQuestions();
    const datas = response.data.results;

    const answers = [];
    const questionsWithTimer = datas.map((el) => {
      answers.push({
        id: el.id,
        userAnswerIdx: undefined,
        userAnswerText: "",
        correctAns: "",
        result: undefined,
      });
      return {
        ...el,
        timeLeft: 15,
      };
    });

    setUserAnswers(answers);
    setQuestions(questionsWithTimer);
    setFetchingQues(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchQuestions();
    }, 0);
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
      const newAnswer = {
        ...userAnswers[currIdxOfQues],
        userAnswerIdx: idx,
        userAnswerText: ansText,
      };
      const newAnswers = userAnswers.map((el, idx) => {
        if (currIdxOfQues !== idx) {
          return el;
        }
        return newAnswer;
      });
      setUserAnswers(newAnswers);
    },
    [currIdxOfQues, userAnswers]
  );

  const revealCorrectAns = useCallback(
    (datas) => {
      const revealedQuestions = [];
      datas.forEach((element, idx) => {
        revealedQuestions.push({
          ...questions[idx],
          correctAns: element.correctanswer,
          result: element.result,
        });
      });
      setQuestions(() => revealedQuestions);
    },
    [questions]
  );

  return {
    questions,
    fetchingQues,
    setSelectedAns,
    userAnswers,
    fetchQuestions,
    revealCorrectAns,
  };
}
