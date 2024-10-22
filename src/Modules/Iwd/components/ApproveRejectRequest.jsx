import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Table, Button, Title, Loader, Grid } from "@mantine/core";
import { CaretLeft } from "@phosphor-icons/react";
import axios from "axios";
import ViewRequestFile from "./ViewRequestFile";
import { host } from "../../../routes/globalRoutes";
// import { DesignationsContext } from "../helper/designationContext";

function ApproveRejectRequest() {
  const role = useSelector((state) => state.user.role);
  const [loading, setLoading] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleBackToList = () => {
    setSelectedRequest(null);
  };

  const [createdRequestsList, setRequestsList] = useState([]);
  useEffect(() => {
    const getCreatedRequests = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          `${host}/iwdModuleV2/api/created-requests-view/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
            params: {
              role,
            },
          },
        );
        setRequestsList(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getCreatedRequests();
  }, [role]);
  console.log(createdRequestsList);
  return (
    <Container style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <br />
      {loading ? (
        <Grid mt="xl">
          <Container py="xl">
            <Loader size="lg" />
          </Container>
        </Grid>
      ) : !selectedRequest ? (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "25px",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
            borderLeft: "10px solid #1E90FF",
          }}
        >
          <Title size="h3" align="center" style={{ marginBottom: "10px" }}>
            Approve/Reject Request
          </Title>
          <Table highlightOnHover>
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Area</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {createdRequestsList.map((request, index) => (
                <tr key={index} id={request.id}>
                  <td>{request.request_id}</td>
                  <td>{request.name}</td>
                  <td>{request.description}</td>
                  <td>{request.area}</td>
                  <td>{request["created-by"]}</td>
                  <td>
                    <Button
                      size="xs"
                      onClick={() => handleViewRequest(request)}
                      style={{ backgroundColor: "#1E90FF", color: "white" }}
                    >
                      View File
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <>
          <Button
            variant="subtle"
            leftIcon={<CaretLeft size={12} />}
            onClick={handleBackToList}
            style={{ marginBottom: "10px" }}
          >
            Back to List
          </Button>
          <ViewRequestFile request={selectedRequest} />
        </>
      )}
    </Container>
  );
}

export default ApproveRejectRequest;
