import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Lawyers from "../pages/Lawyers/Lawyers";
import Services from "../pages/Services";
import MyAccount from "../Dashboard/User-Account/MyAccount";

import Dashboard from "../Dashboard/Lawyer-Account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import LawyerDetails from "../pages/Lawyers/LawyerDetails";
import Contact from "../pages/Contact";
import Chatbot from "../pages/Chatbot";
import CheckoutSuccess from "../pages/CheckoutSuccess";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/lawyers" element={<Lawyers />} />
      <Route path="/lawyers/:id" element={<LawyerDetails />} />
      <Route path="/services" element={<Services />} />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lawyers/profile/me"
        element={
          <ProtectedRoute allowedRoles={["lawyer"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
    </Routes>
  );
};

export default Router;
