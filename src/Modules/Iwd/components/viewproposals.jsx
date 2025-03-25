import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { Container, Table, Button, Title, Loader, Flex } from "@mantine/core";
import { CaretLeft } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { GetItems, GetProposals } from "../handlers/handlers";

function ProposalTable({ requestId, onBack }) {
  // const role = useSelector((state) => state.user.role);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposalId, setSelectedProposalId] = useState(null);
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    if (requestId) {
      GetProposals({
        setLoading,
        setProposalList: setProposals,
        requestId,
        setProposalIds: () => {},
      });
    }
  }, [requestId]);

  const handleViewItems = (proposalId) => {
    GetItems({
      setLoading,
      setItemsList,
      proposalIds: [proposalId],
    });
    setSelectedProposalId(proposalId);
  };

  return (
    <Container>
      {loading ? (
        <Loader size="lg" />
      ) : !selectedProposalId ? (
        <>
          <Title mb="md">Proposals</Title>
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
                proposals.map((proposal) => (
                  <tr key={proposal.id}>
                    <td>{proposal.id}</td>
                    <td>{proposal.status}</td>
                    <td>{proposal.created_by}</td>
                    <td>
                      {new Date(proposal.updated_at).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(proposal.created_at).toLocaleDateString()}
                    </td>
                    <td>{proposal.proposal_budget}</td>
                    <td>
                      <Button
                        size="xs"
                        onClick={() => handleViewItems(proposal.id)}
                        style={{
                          backgroundColor: "#1E90FF",
                          color: "white",
                          borderRadius: "20px",
                        }}
                      >
                        View Items
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No proposals available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Flex direction="row" gap="xs" mt="md">
            <Button
              size="sm"
              variant="light"
              color="gray"
              style={{
                width: "100px",
                backgroundColor: "#1E90FF",
                color: "white",
                borderRadius: "20px",
              }}
              onClick={onBack}
            >
              Back
            </Button>
          </Flex>
        </>
      ) : (
        <div>
          <Title size="26px" mb="md">
            Items for Proposal {selectedProposalId}
          </Title>

          <Table striped highlightOnHover>
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr>
                <th>Item ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Unit</th>
                <th>Price/Unit</th>
                <th>Total</th>
                <th>Document</th>
              </tr>
            </thead>
            <tbody>
              {itemsList.length > 0 ? (
                itemsList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.unit}</td>
                    <td>{item.price_per_unit}</td>
                    <td>{item.total_price}</td>
                    <td>
                      <Button
                        size="xs"
                        color="blue"
                        onClick={() => window.open(item.docs, "_blank")}
                        disabled={!item.docs}
                        style={{ borderRadius: "20px" }}
                      >
                        View Docs
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No items available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Button
            // variant="subtle"
            mt="md"
            leftIcon={<CaretLeft size={12} />}
            onClick={() => setSelectedProposalId(null)}
            // onClick={onBack}
            style={{ borderRadius: "25px" }}
          >
            Back
          </Button>
        </div>
      )}
    </Container>
  );
}

ProposalTable.propTypes = {
  onBack: PropTypes.func.isRequired,
  requestId: PropTypes.number.isRequired,
};

export default ProposalTable;
