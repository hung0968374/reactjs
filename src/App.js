import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Info from "./pages/Info";
import ErrorPage from "./pages/ErrorPage";
import AboutWithId from "./pages/AboutWithId";
import RequireAuth from "./pages/protected/RequireAuth";
import ProtectedPage from "./pages/protected/ProtectedPage";
import DashBoard from "./pages/protected/DashBoard";
import Login from "./pages/Login";

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
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/about" exact element={<About />}>
          <Route path=":id" exact element={<AboutWithId />} />
        </Route>
        {/* <Route path="/about/:id" exact element={<AboutWithId />} /> */}
        <Route path="/info" element={<Info />} />
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
