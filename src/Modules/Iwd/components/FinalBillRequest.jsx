import React from "react";
import {
  Table,
  Button,
  Container,
  Text,
  Breadcrumbs,
  Title,
} from "@mantine/core";

function FinalBillRequest() {
  const handleGenerateFinalBill = (request) => {
    // TODO:
    console.log(request);
  };

  const RequestsInProgressData = [
    {
      id: "1",
      name: "divyansh",
      description: "ahgo",
      area: "lhtc",
      completed: false,
      "created-by": "me",
    },
    {
      id: "3",
      name: "dvijay",
      description: "ahgo",
      area: "lhtc",
      completed: true,
      "created-by": "me",
    },
    {
      id: "4",
      name: "suniljatt",
      description: "ahgo",
      area: "lhtc",
      completed: false,
      "created-by": "me",
    },
  ];

  const breadcrumbItems = [
    { title: "Home", href: "/dashboard" },
    { title: "IWD", href: "/iwd" },
    { title: "FinalBillRequest", href: "#" },
  ].map((item, index) => (
    <Text key={index} component="a" href={item.href} size="sm">
      {item.title}
    </Text>
  ));

  return (
    <Container style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <br />
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "25px",
          padding: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
          borderLeft: "10px solid #1E90FF",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            backgroundColor: "#f5f5f5",
            padding: "10px",
            borderBottom: "1px solid #ccc",
            marginBottom: "10px",
          }}
        >
          <Title size="h3" align="center">
            Details
          </Title>
        </div>
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
            {RequestsInProgressData.map((request, index) => (
              <tr key={index} id={request.id}>
                <td>{request.id}</td>
                <td>{request.name}</td>
                <td>{request.description}</td>
                <td>{request.area}</td>
                <td>{request["created-by"]}</td>
                <td>
                  <Button
                    size="xs"
                    onClick={() => handleGenerateFinalBill(request)}
                    style={{
                      padding: "10px 20px",
                      marginRight: "10px",
                      backgroundColor: "#1E90FF",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "20px",
                    }}
                  >
                    Generate Bill
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default FinalBillRequest;
