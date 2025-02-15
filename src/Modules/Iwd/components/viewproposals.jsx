import React, { useEffect, useState } from "react";
import { Loader, Container, Table } from "@mantine/core";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { GetProposals } from "../handlers/handlers";
import "./GlobTable.css";

function ProposalTable() {
  // const { requestId } = useParams();
  const requestId = 6;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (requestId) {
      GetProposals({ setLoading, setProposalList: setItems, requestId }).then(
        () => {
          console.log("Fetched Items:", items);
        },
      );
    } else {
      setLoading(false);
    }
  }, [requestId]);

  return (
    <Container>
      {loading ? (
        <Loader size="lg" />
      ) : (
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Proposal ID</th>
              <th>Item Name</th>
              <th>Description</th>
              <th>Unit</th>
              <th>Price Per Unit</th>
              <th>Total Price</th>
              <th>View File</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.proposal_id || item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.unit}</td>
                  <td>{item.price_per_unit}</td>
                  <td>{item.total_price}</td>
                  <td>{item.docs}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No proposals available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ProposalTable;
