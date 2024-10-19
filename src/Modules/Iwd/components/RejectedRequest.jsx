import React, { useState } from "react";
import {
  Container,
  Table,
  Button,
  Title,
  Text,
  Breadcrumbs,
} from "@mantine/core";
import UpdateRequestForm from "./UpdateRequestForm";

function RejectedRequest() {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleRequestSelect = (request) => {
    setSelectedRequest(request);
  };

  const handleBackToList = () => {
    setSelectedRequest(null);
  };

  const RejectedRequestData = [
    {
      id: "1",
      name: "divyansh",
      description: "ahgo",
      area: "lhtc",
      "created-by": "me",
    },
    {
      id: "3",
      name: "dvijay",
      description: "ahgo",
      area: "lhtc",
      "created-by": "me",
    },
    {
      id: "4",
      name: "suniljatt",
      description: "ahgo",
      area: "lhtc",
      "created-by": "me",
    },
  ];

  const breadcrumbItems = [
    { title: "Home", href: "/dashboard" },
    { title: "IWD", href: "/iwd" },
    { title: "Rejected Requests", href: "#" },
  ].map((item, index) => (
    <Text key={index} component="a" href={item.href} size="sm">
      {item.title}
    </Text>
  ));

  return (
    <Container style={{ padding: "20px" }}>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
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
          <Title align="center" weight={700} size="lg" mb="md">
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
              {RejectedRequestData.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.name}</td>
                  <td>{request.description}</td>
                  <td>{request.area}</td>
                  <td>{request["created-by"]}</td>
                  <td>
                    <Button
                      size="xs"
                      onClick={() => handleRequestSelect(request)}
                      style={{
                        backgroundColor: "#1E90FF",
                        color: "white",
                        borderRadius: "20px",
                        // padding: "10px 20px",
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
          onBack={handleBackToList}
        />
      )}
    </Container>
  );
}

export default RejectedRequest;
