// IwdRoutes.jsx
// import React from "react";
// import { Route, Outlet } from "react-router-dom";
// import EngineerCreateRequest from "../pages/EngineerCreateRequest";
// import CreateRequest from "../components/createRequest";
// import IssueWorkOrder from "../components/IssueWorkOrder";
// import IssueWorkOrderForm from "../components/IssueWorkOrderForm";
// import RequestInProgress from "../Components/Request_progress/RequestInProgress";
// import RejectedRequest from "../components/RejectedRequest";
import GenerateBills from "../components/GenerateBills";
import FinalBillRequest from "../Components/Final_Bill_Request/FinalBillRequest";
import CreatedRequest from "../Components/Created_Request/CreatedRequest";
import Budget from "../IWD_Admin/Budget/Budget";
import ViewBudget from "../Auditor/View_Budget/ViewBudget";
import ProcessedBills from "../Account_Admin/Processed_Bills/ProcessedBills";
import DeanProcessRequest from "../Director/Dean_Process_Request/DeanProcessRequest";
// import IwdPage from "../index";
// import { Layout } from "../../../components/layout";

// export function IwdRoutes() {
//   return (
//     <Route
//       path="/iwd"
//       element={
//         <Layout>
//           <IwdPage />
//           <Outlet />
//         </Layout>
//       }
//     >
//       <Route path="issue_work_order" element={<IssueWorkOrder />} />
//       <Route path="iwd_request_progress" element={<RequestInProgress />} />
//       <Route path="iwd_rejected_request" element={<RejectedRequest />} />
//       <Route path="iwd_generate_bills" element={<GenerateBills />} />
//       <Route path="iwd_final_bill" element={<FinalBillRequest />} />
//       <Route path="iwd_created_request" element={<CreatedRequest />} />

//       <Route path="iwd_admin/budget" element={<Budget />} />
//       <Route path="iwd_auditor/view_budget" element={<ViewBudget />} />
//       <Route
//         path="account_admin/processed_bills"
//         element={<ProcessedBills />}
//       />
//       <Route
//         path="director/dean_process_request"
//         element={<DeanProcessRequest />}
//       />

//       <Route path="create-request" element={<CreateRequest />} />
//       <Route path="issue-work-order-form" element={<IssueWorkOrderForm />} />
//     </Route>
//   );
// }
