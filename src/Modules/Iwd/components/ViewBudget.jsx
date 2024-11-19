import React, { useState, useEffect } from "react";
import { Container, Table, Title, Grid, Loader } from "@mantine/core";
import { GetBudgets } from "../handlers/handlers";
import "./GlobTable.css";

// view budget fxn
export default function ViewBudget() {
  const [loading, setLoading] = useState(false);

  const [ViewBudgetList, setBudgetList] = useState([]);

  useEffect(() => {
    GetBudgets({ setLoading, setBudgetList });
  }, []);

  // const ViewBudgetList = [
  //   {
  //     id: "1",
  //     name: "divyansh",
  //     budgetIssued: 2000,
  //   },
  //   {
  //     id: "2",
  //     name: "user2",
  //     budgetIssued: 2200,
  //   },
  //   {
  //     id: "3",
  //     name: "user3",
  //     budgetIssued: 2100,
  //   },
  // ];

  return (
    <Container className="container" style={{ padding: "10px" }}>
      <br />

      {loading ? (
        <Grid mt="xl">
          <Container py="xl">
            <Loader size="lg" />
          </Container>
        </Grid>
      ) : ViewBudgetList.length > 0 ? (
        <div className="details-wrapper">
          <Title align="center" mb="md" weight={700} size="26px">
            Budget Details
          </Title>
          <Table highlightOnHover withBorder withColumnBorders>
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Budget Issued</th>
              </tr>
            </thead>
            <tbody>
              {ViewBudgetList.map((request, index) => (
                <tr key={index}>
                  <td>{request.id}</td>
                  <td>{request.name}</td>
                  <td>{request.budgetIssued}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        console.log("No Data: Empty Array")
      )}
    </Container>
  );
}
