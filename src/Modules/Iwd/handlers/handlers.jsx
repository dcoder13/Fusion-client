import axios from "axios";
import { IWD_ROUTES } from "../routes/iwdRoutes";

const GetRequests = async ({ setLoading, setRequestsList, role, URL }) => {
  /* 
    This function is for fetching requests
    Used in 
    - ApproveRejectRequest
    - CreatedRequests
    - IssueWorkOrder 
    - RejectedRequests
    - RequestsInProgress
    - RequestsStatus
  */
  setLoading(true);
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        role,
      },
    });
    setRequestsList(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const GetFileData = async ({ setLoading, request, setMessages }) => {
  setLoading(true);
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(IWD_ROUTES.VIEW_FILE, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        request_id: request.request_id,
        name: request.name,
        area: request.area,
        description: request.description,
        requestCreatedBy: request.requestCreatedBy,
        file_id: request.file_id,
      },
    });
    setMessages(response.data);
    console.log("re", response.data);
    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};

const HandleRequest = async ({
  setIsLoading,
  setIsSuccess,
  setActiveTab,
  role,
  form,
}) => {
  /* 
    This function is for creating new requests
    Used in 
    - CreateRequestForm
  */
  setIsLoading(true);
  setIsSuccess(false);
  const token = localStorage.getItem("authToken");
  const data = form.getValues();
  data.role = role;
  console.log(data);
  try {
    const response = await axios.post(IWD_ROUTES.CREATE_REQUESTS, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log(response);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setActiveTab("0");
      }, 500);
    }, 1000);
  } catch (error) {
    console.log(error);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }
};
const HandleUpdateRequest = async ({
  setIsLoading,
  setIsSuccess,
  setActiveTab,
  role,
  formValues,
}) => {
  /* 
    This function is for creating new requests
    Used in 
    - CreateRequestForm
  */
  setIsLoading(true);
  setIsSuccess(false);
  const token = localStorage.getItem("authToken");
  formValues.role = role;
  console.log(formValues);
  try {
    const response = await axios.post(IWD_ROUTES.UPDATE_REQUESTS, formValues, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log(response);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setActiveTab("0");
      }, 500);
    }, 1000);
  } catch (error) {
    console.log(error);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }
};

const HandleIssueWorkOrder = async ({
  data,
  setIsLoading,
  setIsSuccess,
  onBack,
}) => {
  setIsLoading(true);
  setIsSuccess(false);
  const token = localStorage.getItem("authToken");
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  if (data.date) {
    data.date = formatDate(data.date);
  }
  data.start_date = formatDate(data.start_date);
  data.completion_date = formatDate(data.completion_date);

  console.log(data);
  try {
    const response = await axios.post(IWD_ROUTES.ISSUE_WORK_ORDER, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log(response);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onBack();
      }, 1000);
    }, 1000);
  } catch (error) {
    console.error(error);
    setIsLoading(false);
  }
};

const GetAuditDocuments = async ({
  setLoading,
  setAuditDocumentsList,
  role,
}) => {
  /* 
    TODO:FIXME:
    This function is for fetching inbox of auditor to audit documents
    Used in :
    - AuditDocument
  */
  setLoading(true);
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.get(IWD_ROUTES.AUDIT_DOCUMENTS, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        role,
      },
    });
    setAuditDocumentsList(response.data.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const GetBudgets = async ({ setLoading, setBudgetList }) => {
  /* 
    This function if for fetching list of all Budgets
    Used in :
    - ViewBudget
    - ManageBudget
  */
  setLoading(true);
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(IWD_ROUTES.VIEW_BUDGET, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    setBudgetList(response.data.obj);
    setLoading(false);
  } catch (error) {
    console.error(error);
  }
};

const HandleEditBudget = async ({
  formValues,
  setIsLoading,
  setIsSuccess,
  onBack,
}) => {
  /* 
    This function if for editing an existing budget
    Used in :
    - EditBudget (if operation === edit)
  */
  setIsLoading(true);
  setIsSuccess(false);
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.post(
      IWD_ROUTES.EDIT_BUDGET,
      {
        id: formValues.id,
        name: formValues.name,
        budget: formValues["budget-issued"],
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    console.log(response);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        onBack();
      }, 1000);
    }, 1000);
  } catch (error) {
    console.error("Error editing budget:", error);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }
};
const HandleAddBudget = async ({
  formValues,
  setIsLoading,
  setIsSuccess,
  onBack,
}) => {
  /* 
    This function if for adding a new budget
    Used in :
    - EditBudget (if operation === add)
  */
  setIsLoading(true);
  setIsSuccess(false);
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.post(
      IWD_ROUTES.ADD_BUDGET,
      {
        name: formValues.name,
        budget: formValues["budget-issued"],
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    console.log(response);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onBack();
      }, 1000);
    }, 1000);
  } catch (error) {
    console.error("Error adding/editing budget:", error);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }
};

const HandleMarkAsCompleted = async ({
  setIsLoading,
  setIsSuccess,
  setRefresh,
  request,
}) => {
  setIsLoading(true);
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.patch(
      IWD_ROUTES.MARK_COMPLETED,
      {
        id: request.id,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    console.log(response);
    console.log("asfasf");
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setRefresh((prev) => !prev);
      }, 1000);
    }, 1000);
  }
};
const HandleDirectorApproval = async ({
  form,
  request,
  setIsLoading,
  setIsSuccess,
  handleBackToList,
  action,
  role,
}) => {
  setIsLoading(true);
  setIsSuccess(false);
  const token = localStorage.getItem("authToken");
  const formData = form.getValues();
  formData.fileid = request.file_id;
  formData.role = role;
  formData.action = action;
  try {
    const response = await axios.post(
      IWD_ROUTES.HANDLE_DIRECTOR_APPROVAL,
      formData,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log(response);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        handleBackToList();
      }, 1000);
    }, 1000);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};

export {
  GetAuditDocuments,
  GetRequests,
  GetBudgets,
  GetFileData,
  HandleRequest,
  HandleAddBudget,
  HandleIssueWorkOrder,
  HandleUpdateRequest,
  HandleDirectorApproval,
  HandleMarkAsCompleted,
  HandleEditBudget,
};
