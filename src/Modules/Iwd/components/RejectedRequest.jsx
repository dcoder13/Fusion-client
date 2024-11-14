import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Container, Table, Button, Title, Loader, Grid } from "@mantine/core";
import axios from "axios";
import UpdateRequestForm from "./UpdateRequestForm";
import { host } from "../../../routes/globalRoutes";

function RejectedRequest({ setActiveTab }) {
  const role = useSelector((state) => state.user.role);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRequestSelect = (request) => {
    setSelectedRequest(request);
  };

  const handleBackToList = () => {
    setSelectedRequest(null);
  };

  useEffect(() => {
    const fetchRejectedRequests = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      try {
        const { data } = await axios.get(
          `${host}/iwdModuleV2/api/rejected-requests-view/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
            params: {
              role,
            },
          },
        );
        setRejectedRequests(data.rejected_requests);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRejectedRequests();
  }, []);

  return (
    <Container style={{ padding: "10px" }}>
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
          <Title align="center" weight={700} size="26px" mb="md">
            Rejected Requests
          </Title>
          <Table highlightOnHover withBorder withColumnBorders>
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
              {rejectedRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.name}</td>
                  <td>{request.description}</td>
                  <td>{request.area}</td>
                  <td>{request.requestCreatedBy}</td>
                  <td>
                    <Button
                      size="xs"
                      onClick={() => handleRequestSelect(request)}
                      style={{
                        backgroundColor: "#1E90FF",
                        color: "white",
                        borderRadius: "20px",
                      }}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <UpdateRequestForm
          selectedRequest={selectedRequest}
          setActiveTab={setActiveTab}
          onBack={handleBackToList}
        />
      )}
    </Container>
  );
}
RejectedRequest.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
};

export default RejectedRequest;
