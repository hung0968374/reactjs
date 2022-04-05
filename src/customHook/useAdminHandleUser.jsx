import { useState, useEffect } from "react";
import { api_admin_getUsers } from "../api";

export default function useAdminHandleUser() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await api_admin_getUsers();
    setUsers(data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return { loading, users };
}
