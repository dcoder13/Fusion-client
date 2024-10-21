import React, { useState } from "react";
import {
  Table,
  Button,
  Container,
  Title,
  Paper,
  Text,
  Breadcrumbs,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import IssueWorkOrderForm from "./IssueWorkOrderForm";

function IssueWorkOrder() {
  // const navigate = useNavigate();
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  // const HandleWorkOrder = (e) => {
  //   navigate(`/issue-work-order-form/${e.id}`, { state: { e } });
  // };
  const handleWorkOrderSelect = (workOrder) => {
    setSelectedWorkOrder(workOrder);
  };

  const handleBackToList = () => {
    setSelectedWorkOrder(null);
  };
  const workOrderData = [
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
    { title: "IssueWorkOrder", href: "#" },
  ].map((item, index) => (
    <Text key={index} component="a" href={item.href} size="sm">
      {item.title}
    </Text>
  ));

  return (
    <Container style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <br />
      {!selectedWorkOrder ? (
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
            Work Orders
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
              {workOrderData.map((request, index) => (
                <tr key={index} id={request.id}>
                  <td>{request.id}</td>
                  <td>{request.name}</td>
                  <td>{request.description}</td>
                  <td>{request.area}</td>
                  <td>{request["created-by"]}</td>
                  <td>
                    <Button
                      size="xs"
                      onClick={() => handleWorkOrderSelect(request)}
                      style={{
                        backgroundColor: "#1E90FF",
                        color: "white",
                        borderRadius: "20px",
                      }}
                    >
                      Issue Work Order
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Paper shadow="sm" radius="md" p="md">
          <Button
            variant="subtle"
            leftIcon={<IconChevronLeft size={14} />}
            onClick={handleBackToList}
            style={{ marginBottom: "20px" }}
          >
            Back to List
          </Button>
          <IssueWorkOrderForm
            workOrder={selectedWorkOrder}
            onBack={handleBackToList}
          />
        </Paper>
      )}
    </Container>
  );
}

export default IssueWorkOrder;
