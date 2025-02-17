import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Table, Button, Title, Loader, Grid } from "@mantine/core";
import { CaretLeft } from "@phosphor-icons/react";
import ViewRequestFile from "./ViewRequestFile";
import { GetItems } from "../handlers/handlers";
import { IWD_ROUTES } from "../routes/iwdRoutes";

function ItemList() {
  const role = useSelector((state) => state.user.role);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleViewItem = (item) => {
    setSelectedItem(item);
  };

  const handleBackToList = () => {
    setSelectedItem(null);
    setRefresh((prev) => !prev);
  };

  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    GetItems({
      setLoading,
      setList: setItemsList,
      role,
      URL: IWD_ROUTES.ITEMS_LIST,
    });
  }, [role, refresh]);

  return (
    <Container style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>
      <br />
      {loading ? (
        <Grid mt="xl">
          <Container py="xl">
            <Loader size="lg" />
          </Container>
        </Grid>
      ) : !selectedItem ? (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "25px",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
            borderLeft: "10px solid #1E90FF",
          }}
        >
          <Title size="26px" align="center" mb="md">
            Item List
          </Title>
          <Table highlightOnHover withBorder withColumnBorders>
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr>
                <th>Item ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Area</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {itemsList.map((item, index) => (
                <tr key={index} id={item.item_id}>
                  <td>{item.item_id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.area}</td>
                  <td>{item.createdBy}</td>
                  <td>
                    <Button
                      size="xs"
                      onClick={() => handleViewItem(item)}
                      style={{
                        backgroundColor: "#1E90FF",
                        color: "white",
                        borderRadius: "20px",
                      }}
                    >
                      View Item
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
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
          <ViewRequestFile
            item={selectedItem}
            handleBackToList={handleBackToList}
          />
        </>
      )}
    </Container>
  );
}

export default ItemList;
