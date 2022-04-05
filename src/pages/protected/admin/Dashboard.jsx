import React, { useCallback, useEffect, useMemo, useState } from "react";
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import useDashBoard from "../../../customHook/useDashBoard";
import QuestionModal from "./modal/QuestionModal";

const myOwnToolBar = (addQuestionModal, setAddQuestionModal) => {
  return (
    <Button
      variant="text"
      startIcon={<AddIcon />}
      onClick={() => setAddQuestionModal(!addQuestionModal)}
    >
      Add
    </Button>
  );
};
const responsive = "vertical";
const tableBodyHeight = "650px";
const tableBodyMaxHeight = "";

export default function DashBoard() {
  const { questions, onDeleteQuestions } = useDashBoard();
  const [addQuesModal, setAddQuesModal] = useState(false);
  const [updateQuesModal, setUpdateQuesModal] = useState(false);
  const [dataForModal, setDataForModal] = useState({});
  const [datas, setDatas] = useState([]);

  const deleteQues = (param) => {
    const questionsDeleted = param.data.map((el) => {
      return questions[el.dataIndex];
    });
    const indexesOfDeletedQues = param.data.map((el) => el.dataIndex);
    const newDatas = datas.filter((data, index) => {
      if (!indexesOfDeletedQues.includes(index)) {
        return true;
      }
      return false;
    });
    setDatas(newDatas);
    onDeleteQuestions(questionsDeleted);
  };
  const onUpdateQues = (rowData, dataIdx) => {
    setUpdateQuesModal(true);
    setDataForModal(questions[dataIdx.dataIndex]);
  };

  const options = {
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    filter: false,
    print: false,
    download: false,
    onRowsDelete: deleteQues,
    customToolbar: () => myOwnToolBar(addQuesModal, setAddQuesModal),
    onRowClick: onUpdateQues,
  };

  const columns = useMemo(() => {
    if (questions.length > 0) {
      return Object.keys(questions[0]);
    }
  }, [questions]);

  const setTableDatas = useCallback(() => {
    if (questions) {
      const tableDatas = questions.map((el) => {
        const res = Object.keys(el).map((key) => {
          return el[key];
        });
        return res;
      });
      setDatas(tableDatas);
    }
  }, [questions]);

  useEffect(() => {
    setTableDatas();
  }, [setTableDatas]);
  return (
    <>
      <MUIDataTable
        title={"Questions list"}
        data={datas}
        columns={columns}
        options={options}
      />
      <QuestionModal
        addQuesModal={addQuesModal}
        setAddQuesModal={setAddQuesModal}
        setDatas={setDatas}
        datas={datas}
        dataForModal={dataForModal}
        updateQuesModal={updateQuesModal}
        setUpdateQuesModal={setUpdateQuesModal}
      />
    </>
  );
}
