import React, { useEffect, useState } from "react";
import { Loader, Container, Table } from "@mantine/core";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { GetProposals } from "../handlers/handlers";
import "./GlobTable.css";

function ProposalTable() {
  // const { requestId } = useParams();
  const requestId = 6;
  const [proposals, setproposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

export default ProposalTable;
