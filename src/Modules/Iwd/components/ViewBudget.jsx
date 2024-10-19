import React from "react";
import {
  Breadcrumbs,
  Text,
  Table,
  Container,
  Paper,
  Title,
} from "@mantine/core";

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
      {/* Work Orders Table */}
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
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {ViewBudgetList.map((request, index) => (
              <tr key={index} id={request.id}>
                <td>{request.id}</td>
                <td>{request.name}</td>
                <td>{request["budget-issued"]}</td>
                {/* <td> */}
                {/* <Button
                    className="issue-work-order-button"
                    onClick={() => handleViewBudget(request)}
                  >
                    View File
                  </Button> */}
                {/* </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Container>
  );
}

const styles = `
  .body {
    background-color: #efefef; 
    margin: 0; 
    padding: 0; 
    font-family: Arial, sans-serif; 
  }
  .container {
    padding: 20px;
    font-family: Arial, sans-serif;
    max-width: 800px;
  }
  .breadcrumb {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .tabs {
    margin-bottom: 20px;
  }
  .buttons-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .buttons-container button {
    padding: 10px 15px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-weight: normal;
  }
  .bold-button {
    font-weight: bold; 
    padding: 10px 15px; 
    border: 1px solid #ccc; 
    background-color: transparent; 
    cursor: pointer;
  }
  .buttons-container button:hover {
    font-weight: bold;
  }
  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px; 
    border: 1px solid #ccc; 
    border-radius: 50%;
    background-color: #f0f0f0; 
    cursor: pointer;
    font-size: 18px;
  }
  .work-orders-table {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 25px;
    border-left: 10px solid #1E90FF;
  }
  .table-header {
    font-weight: bold;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  table th, table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ccc;
  }
  .issue-work-order-button {
    color: black;
    border: none;
    cursor: pointer;
    text-align: center;
    justify-content: center;
    display: flex;
    align-items: center;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
