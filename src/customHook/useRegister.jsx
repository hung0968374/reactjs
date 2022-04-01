import { useState } from "react";
import { api_register } from "../api";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

import "antd/dist/antd.css";

function useRegister() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (params) => {
    setLoading(true);
    try {
      await api_register(params);
      Modal.success({
        title: "Success",
        content: "Your account has been created",
        onOk: () => {
          navigate("/login");
        },
      });
    } catch (error) {
      Modal.error({
        title: "Register failed",
        content: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return { loading, registerUser };
}

export default useRegister;
