import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Table,
  Button,
  Title,
  Loader,
  Grid,
  Select,
} from "@mantine/core";
import { CaretLeft } from "@phosphor-icons/react";
import ViewRequestFile from "./ViewRequestFile";
import { IWD_ROUTES } from "../routes/iwdRoutes";
import { GetRequestsOrBills } from "../handlers/handlers";
import IssueWorkOrderForm from "./IssueWorkOrderForm";

function CreatedRequests() {
  const role = useSelector((state) => state.user.role);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setSelectedWorkOrder(null);
  };
  // When clicking "Issue Work Order", we set selectedWorkOrder and clear the request view.
  const handleWorkOrderSelect = (request) => {
    console.log("Work Order Selected:", request);
    setSelectedWorkOrder(request);
    setSelectedRequest(null);
  };

  const handleBackToList = () => {
    setSelectedRequest(null);
    setSelectedWorkOrder(null);
    setRefresh((prev) => !prev);
  };

  const [createdRequestsList, setRequestsList] = useState([]);
  useEffect(() => {
    GetRequestsOrBills({
      setLoading,
      setList: setRequestsList,
      role,
      URL: IWD_ROUTES.REQUESTS_STATUS,
    });
  }, [role, refresh]);

  // Filter the requests based on statusFilter state
  const filteredRequests = createdRequestsList.filter(
    (request) => statusFilter === "all" || request.status === statusFilter,
  );

  // render the Issue Work Order Form if selectedWorkOrder exists.
  if (selectedWorkOrder) {
    return (
      <Container style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>
        <Button
          variant="subtle"
          leftIcon={<CaretLeft size={12} />}
          onClick={handleBackToList}
          style={{ marginBottom: "10px" }}
        >
          Back to List
        </Button>
        <IssueWorkOrderForm
          key={selectedWorkOrder.request_id}
          workOrder={selectedWorkOrder}
          onBack={handleBackToList}
        />
      </Container>
    );
  }

  // render the Request File view if selectedRequest exists.
  if (selectedRequest) {
    return (
      <Container style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>
        <Button
          variant="subtle"
          leftIcon={<CaretLeft size={12} />}
          onClick={handleBackToList}
          style={{ marginBottom: "10px" }}
        >
          Back to List
        </Button>
        <ViewRequestFile
          request={selectedRequest}
          handleBackToList={handleBackToList}
        />
      </Container>
    );
  }
  return (
    <Container style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>
      <br />
      {loading ? (
        <Grid mt="xl">
          <Container py="xl">
            <Loader size="lg" />
          </Container>
        </Grid>
      ) : (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
            borderLeft: "10px solid #1E90FF",
            width: "80vw",
            position: "absolute",
            right: "10vw",
            overflow: "auto",
            margin: "0 auto",
          }}
        >
          <Title size="26px" align="center" mb="md">
            Requests Status
          </Title>
          <Select
            label="Filter by Status"
            placeholder="Select status"
            value={statusFilter}
            onChange={setStatusFilter}
            data={[
              { value: "all", label: "All" },
              { value: "Work Completed", label: "Work Completed" },
              {
                value: "Approved by the director",
                label: "Approved by the director",
              },
              { value: "Rejected", label: "Rejected" },
              { value: "Pending", label: "Pending" },
              { value: "Work Order issued", label: "Work Order issued" },
              { value: "Approved by the dean", label: "Approved by the dean" },
            ]}
            style={{
              top: "10px",
              right: "10px",
              marginBottom: "20px",
              width: "200px",
            }}
          />
          <Table highlightOnHover>
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Area</th>
                <th>Created By</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request, index) => (
                <tr key={index} id={request.request_id}>
                  <td>{request.request_id}</td>
                  <td>{request.name}</td>
                  <td>{request.description}</td>
                  <td>{request.area}</td>
                  <td>{request.requestCreatedBy}</td>
                  <td>{request.status}</td>
                  <td>
                    <Button
                      size="xs"
                      onClick={() => handleViewRequest(request)}
                      style={{
                        backgroundColor: "#1E90FF",
                        color: "white",
                        borderRadius: "20px",
                      }}
                    >
                      View File
                    </Button>
                    {(request.status === "Approved by the director" ||
                      request.status === "Approved by the dean") && (
                      <Button
                        size="xs"
                        onClick={() => handleWorkOrderSelect(request)}
                        style={{
                          backgroundColor: "#1E90FF",
                          color: "white",
                          borderRadius: "20px",
                          marginTop: "5px",
                        }}
                      >
                        Issue Work Order
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default CreatedRequests;
