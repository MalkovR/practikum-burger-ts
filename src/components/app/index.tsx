import style from "./app.module.css";
import AppHeader from "../app-header";
import Burgers from "../burgers";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className={style.container}>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        <Router>
          <Routes>
            <Route path="/" element={<Burgers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </DndProvider>
    </div>
  );
}

export default App;
