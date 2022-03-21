import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Info from "./pages/Info";
import ErrorPage from "./pages/ErrorPage";
import AboutWithId from "./pages/AboutWithId";
import RequireAuth from "./pages/protected/RequireAuth";
import ProtectedPage from "./pages/protected/ProtectedPage";
import DashBoard from "./pages/protected/DashBoard";

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
  const count = useSelector((state) => state.counter.value);

  return (
    <Router>
      <h1>This is file App.js</h1>
      <h3>current count value: {count}</h3>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/about/123">About with id</Link>
        </li>
        <li>
          <Link to="/info">Info</Link>
        </li>
        <li>
          <Link to="/protected">Protected</Link>
        </li>
        <li>
          <Link to="/dashboard">DashBoard</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />}></Route>
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
