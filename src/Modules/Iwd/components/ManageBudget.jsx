import React, { useState } from "react";
import {
  Container,
  Table,
  Button,
  Text,
  Breadcrumbs,
  Title,
} from "@mantine/core";
import EditBudget from "./EditBudgetForm";

function ManageBudget() {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [operation, setOperation] = useState(null);

  const handleBudgetSelect = (budget) => {
    setSelectedBudget(budget);
  };

  const handleBackToList = () => {
    setSelectedBudget(null);
    setOperation(null);
  };

  const budgetList = [
    {
      id: "1",
      name: "divyansh",
      "budget-issued": 1000,
    },
    {
      id: "2",
      name: "dhruv",
      "budget-issued": 2000,
    },
  ];

  // const breadcrumbItems = [
  //   { title: "Home", href: "/dashboard" },
  //   { title: "IWD", href: "/iwd" },
  //   { title: "Manage Budget", href: "#" },
  // ].map((item, index) => (
  //   <Text key={index} component="a" href={item.href} size="sm">
  //     {item.title}
  //   </Text>
  // ));

  return (
    <Container style={{ padding: "20px" }}>
      {/* <Breadcrumbs>{breadcrumbItems}</Breadcrumbs> */}
      <br />
      {!operation ? (
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
            Manage Budgets
          </Title>
          <Table highlightOnHover withBorder withColumnBorders>
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Budget Issued</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {budgetList.map((budget) => (
                <tr key={budget.id}>
                  <td>{budget.id}</td>
                  <td>{budget.name}</td>
                  <td>{budget["budget-issued"]}</td>
                  <td>
                    <Button
                      size="xs"
                      onClick={() => {
                        handleBudgetSelect(budget);
                        setOperation("edit");
                      }}
                      style={{
                        backgroundColor: "#1E90FF",
                        color: "white",
                        borderRadius: "20px",
                        padding: "10px 20px",
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            style={{
              backgroundColor: "#1E90FF",
              color: "white",
              borderRadius: "20px",
              marginTop: "10px",
            }}
            onClick={() => {
              setOperation("add");
            }}
          >
            Add Budget
          </Button>
        </div>
      ) : (
        <EditBudget
          selectedBudget={selectedBudget}
          onBack={handleBackToList}
          checkOperation={operation}
        />
      )}
    </Container>
  );
}

export default ManageBudget;
