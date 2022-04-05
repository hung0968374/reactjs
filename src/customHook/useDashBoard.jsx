import { useState, useEffect } from "react";
import { api_admin_getQuestions, api_admin_deleteQuestions } from "../api";

export default function useDashBoard() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    setLoading(true);
    const { data } = await api_admin_getQuestions();
    setQuestions(data.results);
    setLoading(false);
  };

  const onDeleteQuestions = (elements) => {
    const promises = elements.map((el) => {
      return api_admin_deleteQuestions(el.id);
    });
    Promise.all(promises);
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  return { loading, questions, onDeleteQuestions };
}
