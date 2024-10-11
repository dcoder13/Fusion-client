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
import IssueWorkOrder from "./Modules/Iwd/Components/Issue_Work_Order/IssueWorkOrder";
import RequestInProgress from "./Modules/Iwd/Components/Request_progress/RequestInProgress";
import RejectedRequest from "./Modules/Iwd/Components/Rejected_Request/RejectedRequest";
import GenerateBills from "./Modules/Iwd/Components/Generate_Bills/GenerateBills";
import FinalBillRequest from "./Modules/Iwd/Components/Final_Bill_Request/FinalBillRequest";
import CreatedRequest from "./Modules/Iwd/Components/Created_Request/CreatedRequest";

import Budget from "./Modules/Iwd/IWD_Admin/Budget/Budget";
import ViewBudget from "./Modules/Iwd/Auditor/View_Budget/ViewBudget";
import ProcessedBills from "./Modules/Iwd/Account_Admin/Processed_Bills/ProcessedBills";
import DeanProcessRequest from "./Modules/Iwd/Director/Dean_Process_Request/DeanProcessRequest";

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

          path="/iwd/iwd_admin/budget"
          element={
            <Layout>
              <Budget />
            </Layout>
          }
        />
        <Route
          path="/iwd/iwd_auditor/view_budget"
          element={
            <Layout>
              <ViewBudget />
            </Layout>
          }
        />
        <Route
          path="/iwd/account_admin/processed_bills"
          element={
            <Layout>
              <ProcessedBills />
            </Layout>
          }
        />
        <Route
          path="/iwd/director/dean_process_request"
          element={
            <Layout>
              <DeanProcessRequest />
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
