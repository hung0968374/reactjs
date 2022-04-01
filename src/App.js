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

const ProtectedRoutes = [
  {
    path: "/quiz",
    component: <Quiz />,
  },
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<RestrictLoginAndRegister />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
        </Route>
        {/* <Route path="/about/:id" exact element={<AboutWithId />} /> */}
        <Route element={<RequireAuth />}>
          <Route path="/quiz" element={<QuizLayout />}>
            <Route path="" element={<Quiz />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
