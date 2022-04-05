import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import RequireAuth from "./pages/protected/RequireAuth";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RestrictLoginAndRegister from "./pages/protected/RestrictLoginAndRegister";
import Quiz from "./pages/protected/user/Quiz";
import QuizLayout from "./pages/Layout/QuizLayout";
import UserAuth from "./pages/protected/user/UserAuth";
import AdminAuth from "./pages/protected/admin/AdminAuth";
import Dashboard from "./pages/protected/admin/Dashboard";
import AdminLayout from "./pages/Layout/admin/AdminLayout";
import User from "./pages/protected/admin/User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<RestrictLoginAndRegister />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
        </Route>
        <Route element={<RequireAuth />}>
          <Route element={<UserAuth />}>
            <Route path="/quiz" element={<QuizLayout />}>
              <Route path="" element={<Quiz />}></Route>
            </Route>
          </Route>
          <Route path="/admin" element={<AdminAuth />}>
            <Route path="" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="user" element={<User />}></Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
