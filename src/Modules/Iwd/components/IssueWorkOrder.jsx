import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Button, Container, Title, Loader, Grid } from "@mantine/core";
import { CaretLeft } from "@phosphor-icons/react";
import axios from "axios";
import PropTypes from "prop-types";
import IssueWorkOrderForm from "./IssueWorkOrderForm";
import { host } from "../../../routes/globalRoutes";

function IssueWorkOrder() {
  const role = useSelector((state) => state.user.role);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleWorkOrderSelect = (workOrder) => {
    setSelectedWorkOrder(workOrder);
  };

  const handleBackToList = () => {
    setActiveTab("0");
  };

  // const workOrderData = [
  //   {
  //     id: "1",
  //     name: "divyansh",
  //     description: "ahgo",
  //     area: "lhtc",
  //     requestCreatedBy: "me",
  //   },
  //   {
  //     id: "3",
  //     name: "dvijay",
  //     description: "ahgo",
  //     area: "lhtc",
  //     requestCreatedBy: "me",
  //   },
  //   {
  //     id: "4",
  //     name: "suniljatt",
  //     description: "ahgo",
  //     area: "lhtc",
  //     requestCreatedBy: "me",
  //   },
  // ];
  // const workOrderData = [];

  const [issueworkorderList, setissueworkorderList] = useState([]);
  useEffect(() => {
    const getCreatedRequests = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          `${host}/iwdModuleV2/api/issue-work-order/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
            params: {
              role,
            },
          },
        );
        setissueworkorderList(response.data.requests);
        console.log(response);
        console.log(response.data.requests);

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getCreatedRequests();
  }, [role]);
  console.log(issueworkorderList);

  return (
    <Container style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <br />
      {loading ? (
        <Grid mt="xl">
          <Container py="xl">
            <Loader size="lg" />
          </Container>
        </Grid>
      ) : !selectedWorkOrder ? (
        <Container style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
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
                {issueworkorderList.map((request, index) => (
                  <tr key={index} id={request.id}>
                    <td>{request.id}</td>
                    <td>{request.name}</td>
                    <td>{request.description}</td>
                    <td>{request.area}</td>
                    <td>{request.requestCreatedBy}</td>
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
        </Container>
      ) : (
        <>
          <Button
            variant="subtle"
            leftIcon={<CaretLeft size={12} />}
            onClick={handleBackToList}
            style={{ marginBottom: "10px" }}
          >
            Back to List
          </Button>
          <IssueWorkOrderForm
            workOrder={selectedWorkOrder}
            onBack={handleBackToList}
          />
        </>
      )}
    </Container>
  );
}
IssueWorkOrder.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
};
export default IssueWorkOrder;
