import React, { useEffect, useState } from "react";
import { Loader, Container, Table } from "@mantine/core";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { GetProposals } from "../handlers/handlers";
import "./GlobTable.css";

function ProposalTable({ requestId }) {
  // const requestId = useSelector((state) => state.request.id);
  // const requestId = 6;
  const [proposals, setproposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Request ID:", requestId);
    if (requestId) {
      GetProposals({
        setLoading,
        setProposalList: setproposals,
        requestId,
      }).then(() => {
        console.log("Fetched proposals:", proposals);
      });
    } else {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    console.log("Updated proposals:", proposals);
  }, [proposals]);

  return (
    <Container>
      {loading ? (
        <Loader size="lg" />
      ) : (
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Proposal ID</th>
              <th>Created By</th>
              <th>Last Updated</th>
              <th>Created At</th>
              <th>Current Status</th>
              <th>File ID</th>
              <th>Proposal Budget</th>
            </tr>
          </thead>
          <tbody>
            {proposals.length > 0 ? (
              proposals.map((item) => (
                <tr key={item.id}>
                  <td>{item.proposal_id || item.id}</td>
                  <td>{item.created_by}</td>
                  <td>{item.updated_at}</td>
                  <td>{item.created_at}</td>
                  <td>{item.status}</td>
                  <td>{item.file_id}</td>
                  <td>{item.proposal_budget}</td>
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
