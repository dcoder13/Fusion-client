import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Table,
  Button,
  Title,
  Breadcrumbs,
  Text,
} from "@mantine/core";
import axios from "axios";
import ViewRequestFile from "./ViewRequestFile";
import { host } from "../../../routes/globalRoutes";
// import { DesignationsContext } from "../helper/designationContext";

function CreatedRequests() {
  const role = useSelector((state) => state.user.role);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleBackToList = () => {
    setSelectedRequest(null);
  };

  const CreatedRequestsList = [];
  useEffect(() => {
    const getCreatedRequests = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          `${host}/iwdModuleV2/api/created-requests-view/`,
          {
            headers: {
              Authorization: `Token ${token}`,
              role,
            },
            params: {
              role,
            },
          },
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getCreatedRequests();
  }, [role]);
  const breadcrumbItems = [
    { title: "Home", href: "/dashboard" },
    { title: "IWD", href: "/iwd" },
    { title: "Created Request", href: "#" },
  ].map((item, index) => (
    <Text key={index} component="a" href={item.href} size="sm">
      {item.title}
    </Text>
  ));

  return (
    <Container style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* <Breadcrumbs>{breadcrumbItems}</Breadcrumbs> */}
      <br />
      {!selectedRequest ? (
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
            {" "}
            Created Requests{" "}
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
              {CreatedRequestsList.map((request, index) => (
                <tr key={index} id={request.id}>
                  <td>{request.id}</td>
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
        <ViewRequestFile request={selectedRequest} onBack={handleBackToList} />
      )}
    </Container>
  );
}

export default CreatedRequests;
