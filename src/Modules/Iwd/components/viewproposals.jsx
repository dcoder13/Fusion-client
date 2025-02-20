import React, { useEffect, useState } from "react";
import { Loader, Container, Table, Button } from "@mantine/core";
import PropTypes from "prop-types";
import { GetProposals } from "../handlers/handlers";
// import ViewSelectedProposal from "./viewSelectedProposal";
function ProposalTable({ requestId }) {
  const [proposals, setproposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Request ID:", requestId);
    if (requestId) {
      GetProposals({
        setLoading,
        setProposalList: setproposals,
        requestId,
      });
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
              <th>Current Status</th>
              <th>Created By</th>
              <th>Last Updated</th>
              <th>Created At</th>
              <th>Proposal Budget</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {proposals.length > 0 ? (
              proposals.map((item) => (
                <tr key={item.id}>
                  <td>{item.proposal_id || item.id}</td>
                  <td>{item.status}</td>
                  <td>{item.created_by}</td>
                  <td>{item.updated_at}</td>
                  <td>{item.created_at}</td>
                  <td>{item.proposal_budget}</td>
                  <Button
                    size="xs"
                    // onClick={() => handleViewProposal(item)}
                    style={{
                      backgroundColor: "#1E90FF",
                      color: "white",
                      borderRadius: "20px",
                    }}
                  >
                    View File
                  </Button>
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
ProposalTable.propTypes = {
  requestId: PropTypes.number.isRequired,
};

export default ProposalTable;
