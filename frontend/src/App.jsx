import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./Context/AppContext";
import { useContext } from "react";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import "./App.css";
import Dashboard from "./Pages/Auth/Dashboard";
import Notfound from "./Pages/Notfound";
import Employee from "./Pages/Auth/Employee";


export default function App() {
  const { user } = useContext(AppContext);

  return (

    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Dashboard />}  />
          <Route path="*" element={<Notfound />} />
          <Route path="/employee"  element={<Employee />} />
      </Routes>
    </BrowserRouter>
  );
}
