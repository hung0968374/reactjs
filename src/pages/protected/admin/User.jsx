import React, { useCallback, useEffect, useMemo, useState } from "react";
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import useAdminHandleUser from "../../../customHook/useAdminHandleUser";
import HandleUserModal from "./modal/HandleUserModal";

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
export default function User() {
  const { users } = useAdminHandleUser();
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [dataForModal, setDataForModal] = useState({});
  const [datas, setDatas] = useState([]);

  const onUpdateUser = (rowData, dataIdx) => {
    setIsUpdatingUser(true);
    setDataForModal(users[dataIdx.dataIndex]);
  };

  const options = {
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    filter: false,
    print: false,
    download: false,
    onRowsDelete: () => false,
    customToolbar: () => myOwnToolBar(isAddingUser, setIsAddingUser),
    onRowClick: onUpdateUser,
  };

  const columns = useMemo(() => {
    if (users.length > 0) {
      return Object.keys(users[0]);
    }
  }, [users]);

  const setTableDatas = useCallback(() => {
    if (users) {
      const tableDatas = users.map((el) => {
        const res = Object.keys(el).map((key) => {
          return el[key];
        });
        return res;
      });
      setDatas(tableDatas);
    }
  }, [users]);

  useEffect(() => {
    setTableDatas();
  }, [setTableDatas]);
  return (
    <>
      <MUIDataTable
        title={"Users list"}
        data={datas}
        columns={columns}
        options={options}
      />
      <HandleUserModal
        isAddingUser={isAddingUser}
        setIsAddingUser={setIsAddingUser}
        isUpdatingUser={isUpdatingUser}
        setIsUpdatingUser={setIsUpdatingUser}
        setDatas={setDatas}
        datas={datas}
        dataForModal={dataForModal}
      />
    </>
  );
}
