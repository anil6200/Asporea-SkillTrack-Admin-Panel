import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../components/layouts/AdminLayout";
import Candidates from "../pages/Candidates";
import Courses from "../pages/Courses";
import Assessments from "../pages/Assessments";
import SearchResults from "../pages/SearchResults";

const Approute = () => {
  return (
    <Routes>

      // Public Route
      <Route path="/login" element={<Login />} />

      // Protected Routes
      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/candidates/:id" element={<Candidates />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/search" element={<SearchResults />} />
        </Route>
      </Route>

      // fallback route
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
};

export default Approute;
