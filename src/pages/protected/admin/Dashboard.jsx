import React, { useMemo } from "react";
import Chip from "@material-ui/core/Chip";
import MUIDataTable, { TableFilterList } from "mui-datatables";
import useDashBoard from "../../../customHook/useDashBoard";
import { Modal } from "antd";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "antd/dist/antd.css";

const myOwnToolBar = () => {
  return (
    <Button variant="text" startIcon={<AddIcon />}>
      Add
    </Button>
  );
};

export default function DashBoard() {
  const { questions, onDeleteQuestions } = useDashBoard();

  const responsive = "vertical";
  const tableBodyHeight = "700px";
  const tableBodyMaxHeight = "";

  const deleteQues = (param) => {
    const questionsDeleted = param.data.map((el) => {
      return questions[el.dataIndex];
    });
    onDeleteQuestions(questionsDeleted);
  };

  const options = {
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    filter: false,
    print: false,
    onRowsDelete: deleteQues,
    onDownload: false,
    customToolbar: myOwnToolBar,
  };

  const columns = useMemo(() => {
    if (questions.length > 0) {
      return Object.keys(questions[0]);
    }
  }, [questions]);

  const datas = useMemo(() => {
    if (questions) {
      return questions.map((el) => {
        const res = Object.keys(el).map((key) => {
          return el[key];
        });
        return res;
      });
    }
  }, [questions]);

  return (
    <>
      <MUIDataTable
        title={"Questions list"}
        data={datas}
        columns={columns}
        options={options}
      />
    </>
  );
}
