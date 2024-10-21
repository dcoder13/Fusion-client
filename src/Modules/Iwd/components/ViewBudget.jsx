import React from "react";
import {
  Breadcrumbs,
  Text,
  Table,
  Container,
  Paper,
  Title,
} from "@mantine/core";
import "./GlobTable.css";

export default function ViewBudget() {
  // const [selectedBudget, setSelectedBudget] = useState(null);
  // const handleViewBudget = (request) => {
  //   // TODO:
  //   setSelectedBudget(request);
  // };

  // const handleBackToList = () => {
  //   setSelectedBudget(null);
  // };

  const ViewBudgetList = [
    {
      id: "1",
      name: "divyansh",
      "budget-issued": 2000,
    },
    {
      id: "2",
      name: "user2",
      "budget-issued": 2200,
    },
    {
      id: "3",
      name: "user3",
      "budget-issued": 2100,
    },
  ];

  const breadcrumbItems = [
    { title: "Home", href: "/dashboard" },
    { title: "IWD", href: "/iwd" },
    { title: "View Budget", href: "#" },
  ].map((item, index) => (
    <Text key={index} component="a" href={item.href} size="sm">
      {item.title}
    </Text>
  ));

  return (
    <Container className="container">
      <Breadcrumbs style={{ backgroundColor: "#f5f5f5" }}>
        {breadcrumbItems}
      </Breadcrumbs>
      <br />
      <Paper className="work-orders-table" shadow="xs" padding="md">
        <div className="table-header">
          <Title className="issue-work-order-button" size="h4">
            Details
          </Title>
        </div>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Budget Issued</th>
            </tr>
          </thead>
          <tbody>
            {ViewBudgetList.map((request, index) => (
              <tr key={index} id={request.id}>
                <td>{request.id}</td>
                <td>{request.name}</td>
                <td>{request["budget-issued"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Container>
  );
}
