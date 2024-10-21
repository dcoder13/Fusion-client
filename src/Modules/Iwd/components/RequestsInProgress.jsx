import React from "react";
import {
  Container,
  Table,
  Button,
  Title,
  Text,
  Breadcrumbs,
} from "@mantine/core";

function RequestsInProgress() {
  const handleMarkAsCompleted = (request) => {
    // TODO:
    console.log(request);
  };
  const handleDoneRequest = (request) => {
    // TODO:
    console.log(request);
  };
  const handleInventory = (request) => {
    // TODO:
    console.log(request);
  };
  const handleGenerateBill = (request) => {
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

  // const breadcrumbItems = [
  //   { title: "Home", href: "/dashboard" },
  //   { title: "IWD", href: "/iwd" },
  //   { title: "Request in progress", href: "#" },
  // ].map((item, index) => (
  //   <Text key={index} component="a" href={item.href} size="sm">
  //     {item.title}
  //   </Text>
  // ));

  return (
    <Container style={{ padding: "20px" }}>
      {/* <Breadcrumbs>{breadcrumbItems}</Breadcrumbs> */}
      <br />
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
          Requests In Progress
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
            {RequestsInProgressData.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.name}</td>
                <td>{request.description}</td>
                <td>{request.area}</td>
                <td>{request["created-by"]}</td>
                <td>
                  {request.completed ? (
                    <>
                      <Button
                        size="xs"
                        onClick={() => handleGenerateBill(request)}
                        style={{
                          backgroundColor: "#1E90FF",
                          color: "white",
                          borderRadius: "20px",
                          marginRight: "10px",
                        }}
                      >
                        Generate Bill
                      </Button>
                      <Button
                        size="xs"
                        onClick={() => handleDoneRequest(request)}
                        style={{
                          backgroundColor: "#1E90FF",
                          color: "white",
                          borderRadius: "20px",
                        }}
                      >
                        Done
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="xs"
                        onClick={() => handleMarkAsCompleted(request)}
                        style={{
                          backgroundColor: "#1E90FF",
                          color: "white",
                          borderRadius: "20px",
                          marginRight: "10px",
                        }}
                      >
                        Mark as Completed
                      </Button>
                      <Button
                        size="xs"
                        onClick={() => handleInventory(request)}
                        style={{
                          backgroundColor: "#1E90FF",
                          color: "white",
                          borderRadius: "20px",
                        }}
                      >
                        Inventory
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default RequestsInProgress;
