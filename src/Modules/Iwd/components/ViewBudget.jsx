import React, { useState, useEffect } from "react";
import { Table, Container, Paper, Title, Grid, Loader } from "@mantine/core";
import axios from "axios";
import { IWD_ROUTES } from "../routes/iwdRoutes";
import "./GlobTable.css";
// view budget fxn
export default function ViewBudget() {
  // const [selectedBudget, setSelectedBudget] = useState(null);
  // const handleViewBudget = (request) => {
  //   // TODO:
  //   setSelectedBudget(request);
  // };

  const [loading, setLoading] = useState(false);

  const [ViewBudgetList, setViewBudgetList] = useState([]);
  useEffect(() => {
    const getBudgets = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(IWD_ROUTES.VIEW_BUDGET, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        // console.log(response.data);
        setViewBudgetList(response.data.obj);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getBudgets();
  }, []);
  // console.log('ViewBudgetList:', ViewBudgetList, 'Type:', typeof ViewBudgetList);

  // const ViewBudgetList = [
  //   {
  //     id: "1",
  //     name: "divyansh",
  //     "budget-issued": 2000,
  //   },
  //   {
  //     id: "2",
  //     name: "user2",
  //     "budget-issued": 2200,
  //   },
  //   {
  //     id: "3",
  //     name: "user3",
  //     "budget-issued": 2100,
  //   },
  // ];

  return (
    <Container className="container">
      <br />
      {loading ? (
        <Grid mt="xl">
          <Container py="xl">
            <Loader size="lg" />
          </Container>
        </Grid>
      ) : (
        <Paper className="s-table" shadow="xs" padding="md">
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
                  {/* <td>{request["budgetIssued"]}</td> */}
                  <td>{request.budgetIssued}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
