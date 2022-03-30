import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import RequireAuth from "./pages/protected/RequireAuth";
import ProtectedPage from "./pages/protected/ProtectedPage";
import DashBoard from "./pages/protected/DashBoard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RestrictLoginAndRegister from "./pages/protected/RestrictLoginAndRegister";

const ProtectedRoutes = [
  {
    path: "/protected",
    component: <ProtectedPage />,
  },
  {
    path: "/dashboard",
    component: <DashBoard />,
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
          {ProtectedRoutes.map((page, index) => {
            return (
              <Route path={page.path} element={page.component} key={index} />
            );
          })}
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
