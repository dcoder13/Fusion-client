import React, { useState, useEffect } from "react";
import { Table, Button, Container, Group, Title, Loader } from "@mantine/core";
import ViewRequestFile from "./ViewRequestFile";
import axios from 'axios';
import { host } from "../../../routes/globalRoutes";

function ProcessedBills() {
  const [selectedBill, setSelectedBill] = useState(null);
  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${host}/iwdModuleV2/api/generated-bills-view/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
            params: {
              role,
            },
          },);
        setBudgetList(response.data.obj);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewFile = (bill) => {
    setSelectedBill(bill);
  };

  const handleSettleBill = (bill) => {
    console.log(bill);
  };

  const handleBackToBills = () => {
    setSelectedBill(null);
  };

  return (
    <Container style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <br />
      {loading ? (
        <Grid mt="xl">
          <Container py="xl">
            <Loader size="lg" />
          </Container>
        </Grid>
      ) : (<Container style={{ padding: "20px" }}>
        {!selectedBill ? (
          <div style={{ padding: "20px" }}>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "25px",
                padding: "20px",
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
                <Title size="h4" align="center">
                  Details
                </Title>
              </div>
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Area</th>
                    <th>Request Created By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetList.map((bill) => (
                    <tr key={bill.id}>
                      <td>{bill.id}</td>
                      <td>{bill.name}</td>
                      <td>{bill.description}</td>
                      <td>{bill.area}</td>
                      <td>{bill.requestCreatedBy}</td>
                      <td>
                        <Button onClick={() => handleViewFile(bill)}>View</Button>
                        <Button onClick={() => handleSettleBill(bill)}>Settle</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        ) : (
          <ViewRequestFile bill={selectedBill} onBack={handleBackToBills} />
        )}
      </Container>)}
    </Container>
  );
}

export default ProcessedBills;
