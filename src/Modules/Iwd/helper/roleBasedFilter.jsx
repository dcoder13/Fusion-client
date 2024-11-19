import ModuleNotifications from "../components/ModuleNotifications";
import CreateRequest from "../components/CreateRequestForm";
import IssueWorkOrder from "../components/IssueWorkOrder";
import RejectedRequests from "../components/RejectedRequest";
import RequestsInProgress from "../components/RequestsInProgress";
import FinalBillRequest from "../components/FinalBillRequest";
import ManageBudget from "../components/ManageBudget";
import CreatedRequests from "../components/CreatedRequests";
import ViewBudget from "../components/ViewBudget";
import ProcessedBills from "../components/ProcessedBills";
import RequestsStatus from "../components/RequestsStatus";
import ApproveRejectRequest from "../components/ApproveRejectRequest";
import AuditDocument from "../components/AuditDocument";

const RoleBasedFilter = ({ setActiveTab }) => {
  const tabItems = [
    { title: "Notifications", component: <ModuleNotifications /> },
    {
      title: "Create Request",
      component: <CreateRequest setActiveTab={setActiveTab} />,
    },
    { title: "Requests in Progress", component: <RequestsInProgress /> },
    {
      title: "Issue Work Order",
      component: <IssueWorkOrder setActiveTab={setActiveTab} />,
    },
    { title: "Generate Final Bill", component: <FinalBillRequest /> },
    {
      title: "Rejected Requests",
      component: <RejectedRequests setActiveTab={setActiveTab} />,
    },
    { title: "Manage Budget", component: <ManageBudget /> },
    {
      title: "Created Requests",
      component: <CreatedRequests setActiveTab={setActiveTab} />,
    },
    { title: "View Budget", component: <ViewBudget /> },
    { title: "Processed Bills", component: <ProcessedBills /> },
    {
      title: "Approve/Reject Requests",
      component: <ApproveRejectRequest setActiveTab={setActiveTab} />,
    },
    { title: "Audit Document", component: <AuditDocument /> },
    { title: "Requests Status", component: <RequestsStatus /> },
  ];
  const roleBasedTabs = {
    Director: tabItems.filter((tab) =>
      [
        "Notifications",
        "Create Request",
        "Created Requests",
        "Approve/Reject Requests",
        "View Budget",
        "Requests Status",
        "Rejected Requests",
      ].includes(tab.title),
    ),
    "Dean (P&D)": tabItems.filter((tab) =>
      [
        "Notifications",
        "Create Request",
        "Created Requests",
        "Requests Status",
        "Rejected Requests",
      ].includes(tab.title),
    ),
    Auditor: tabItems.filter((tab) =>
      [
        "Notifications",
        "View Budget",
        "Created Requests",
        "Audit Document",
        "Requests Status",
        "Rejected Requests",
      ].includes(tab.title),
    ),
    SectionHead_IWD: tabItems.filter((tab) =>
      [
        "Notifications",
        "Create Request",
        "Created Requests",
        "Requests in Progress",
        "Issue Work Order",
        "Manage Budget",
        "View Budget",
        "Requests Status",
        "Rejected Requests",
      ].includes(tab.title),
    ),
    Professor: tabItems.filter((tab) =>
      [
        "Notifications",
        "Create Request",
        "Requests in Progress",
        "Created Requests",
        "Requests Status",
        "Rejected Requests",
      ].includes(tab.title),
    ),
    EE: tabItems.filter((tab) =>
      [
        "Notifications",
        "Create Request",
        "Created Requests",
        "Requests in Progress",
        "Issue Work Order",
        "Manage Budget",
        "View Budget",
        "Requests Status",
        "Rejected Requests",
      ].includes(tab.title),
    ),
    "Executive Engineer (Civil)": tabItems.filter((tab) =>
      [
        "Notifications",
        "Create Request",
        "Created Requests",
        "Requests in Progress",
        "Issue Work Order",
        "Manage Budget",
        "View Budget",
        "Requests Status",
        "Rejected Requests",
      ].includes(tab.title),
    ),
    Civil_AE: tabItems.filter((tab) =>
      [
        "Notifications",
        "Create Request",
        "Created Requests",
        "Requests in Progress",
        "Issue Work Order",
        "Manage Budget",
        "View Budget",
        "Requests Status",
        "Rejected Requests",
      ].includes(tab.title),
    ),
    Civil_JE: tabItems.filter((tab) =>
      [
        "Notifications",
        "Create Request",
        "Created Requests",
        "Requests in Progress",
        "Issue Work Order",
        "Manage Budget",
        "View Budget",
        "Requests Status",
        "Rejected Requests",
      ].includes(tab.title),
    ),
    Electrical_JE: tabItems.filter((tab) =>
      [
        "Notifications",
        "Create Request",
        "Created Requests",
        "Requests in Progress",
        "Issue Work Order",
        "Manage Budget",
        "View Budget",
        "Requests Status",
        "Rejected Requests",
      ].includes(tab.title),
    ),
    Electrical_AE: tabItems.filter((tab) =>
      [
        "Notifications",
        "Create Request",
        "Created Requests",
        "Requests in Progress",
        "Issue Work Order",
        "Manage Budget",
        "View Budget",
        "Requests Status",
        "Rejected Requests",
      ].includes(tab.title),
    ),
    "Junior Engineer": tabItems.filter((tab) =>
      [
        "Notifications",
        "Create Request",
        "Created Requests",
        "Requests in Progress",
        "Issue Work Order",
        "Manage Budget",
        "View Budget",
        "Requests Status",
        "Rejected Requests",
      ].includes(tab.title),
    ),
    "Admin IWD": tabItems.filter((tab) =>
      [
        "Notifications",
        "Create Request",
        "Created Requests",
        "Requests in Progress",
        "Manage Budget",
        "Requests Status",
        "Rejected Requests",
      ].includes(tab.title),
    ),
    "Accounts Admin": tabItems.filter((tab) =>
      [
        "Notifications",
        "Create Request",
        "Processed Bills",
        "Manage Budget",
        "View Budget",
        "Requests Status",
        "Rejected Requests",
      ].includes(tab.title),
    ),
  };
  return { roleBasedTabs, tabItems };
};

export default RoleBasedFilter;
