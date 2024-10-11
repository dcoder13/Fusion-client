import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { Layout } from "./components/layout";
import Dashboard from "./Modules/Dashboard/dashboardNotifications";
import Profile from "./Modules/Profile/profile";
import LoginPage from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import AcademicPage from "./Modules/Academic/index";
import IwdPage from "./Modules/Iwd/index";
import ValidateAuth from "./helper/validateauth";
import IssueWorkOrder from "./Modules/Iwd/components/Issue_Work_Order/IssueWorkOrder";
import RequestInProgress from "./Modules/Iwd/components/Request_progress/RequestInProgress";
import RejectedRequest from "./Modules/Iwd/components/Rejected_Request/RejectedRequest";
import GenerateBills from "./Modules/Iwd/components/Generate_Bills/GenerateBills";
import FinalBillRequest from "./Modules/Iwd/components/Final_Bill_Request/FinalBillRequest";
import CreatedRequest from "./Modules/Iwd/components/Created_Request/CreatedRequest";
import EngineerCreateRequest from "./Modules/Iwd/Pages/EngineerCreateRequest";
import EngineerIssueWorkOrder from "./Modules/Iwd/Pages/EngineerIssueWorkOrder";

export default function App() {
  const location = useLocation();
  return (
    <MantineProvider>
      <Notifications
        position="top-right"
        zIndex={1000}
        autoClose={2000}
        limit={1}
      />
      {location.pathname !== "/accounts/login" &&
        location.pathname !== "/reset-password" && <ValidateAuth />}
      <Routes>
        <Route path="/" element={<Navigate to="/accounts/login" replace />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/iwd/iwd_work_order"
          element={
            <Layout>
              <IssueWorkOrder />
            </Layout>
          }
        />
        <Route
          path="/iwd/iwd_request_progress"
          element={
            <Layout>
              <RequestInProgress />
            </Layout>
          }
        />
        <Route
          path="/iwd/iwd_rejected_request"
          element={
            <Layout>
              <RejectedRequest />
            </Layout>
          }
        />
        <Route
          path="/iwd/iwd_generate_Bills"
          element={
            <Layout>
              <GenerateBills />
            </Layout>
          }
        />
        <Route
          path="/iwd/iwd_final_bill"
          element={
            <Layout>
              <FinalBillRequest />
            </Layout>
          }
        />
        <Route
          path="/iwd/iwd_created_request"
          element={
            <Layout>
              <CreatedRequest />
            </Layout>
          }
        />
        <Route
          path="/academics"
          element={
            <Layout>
              <AcademicPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/iwd"
          element={
            <Layout>
              <IwdPage />
            </Layout>
          }
        />
        <Route
          path="/iwd/createRequest"
          element={
            <Layout>
              <EngineerCreateRequest />
            </Layout>
          }
        />
        <Route
          path="/iwd/issueWorkOrder"
          element={
            <Layout>
              <EngineerIssueWorkOrder />
            </Layout>
          }
        />
        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Routes>
    </MantineProvider>
  );
}
