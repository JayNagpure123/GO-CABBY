import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NavigationBar from "./components/navigationBar/NavigationBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/body/login/Login";
import SignUp from "./components/body/signup/SignUp";
import ApplicationRequestComponent from "./components/UpdateStatus/ApplicationRequestComponent";
import ApplicationRequestListComponent from "./components/PendingApplications/ApplicationRequestListComponent";
import Home from "./components/body/home/Home";
import AboutUs from "./components/body/aboutUs/AboutUs";
import FAQ from "./components/body/faq/FAQ";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route
            path="/applications"
            element={
              <ProtectedRoute roles={["SECURITYHEAD"]}>
                <ApplicationRequestListComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/application/:userId"
            element={
              <ProtectedRoute roles={["SECURITYHEAD"]}>
                <ApplicationRequestComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
