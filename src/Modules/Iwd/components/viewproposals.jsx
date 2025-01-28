import React from "react";
import {
  Container,
  Paper,
  Table,
  Badge,
  Button,
  Flex,
  Title,
  Group,
} from "@mantine/core";

function ViewProposalsStatic() {
  return (
    <Container>
      <Paper
        radius="md"
        px="lg"
        py="xl"
        withBorder
        style={{
          width: "90%",
          margin: "auto",
          backgroundColor: "#f8f9fa",
        }}
      >
        {/* Header Section */}
        <Flex justify="space-between" align="center" mb="lg">
          <Title size="26px" weight={700}>
            View Proposals
          </Title>
          <Group>
            <Button variant="light" size="sm" color="blue">
              All Requests
            </Button>
            <Button variant="light" size="sm" color="teal">
              Approved
            </Button>
            <Button variant="light" size="sm" color="gray">
              Unapproved
            </Button>
          </Group>
        </Flex>

        {/* Static Table Section */}
        <Table
          withBorder
          highlightOnHover
          style={{ borderRadius: "10px", overflow: "hidden" }}
        >
          <thead style={{ backgroundColor: "#f1f3f5" }}>
            <tr>
              <th>Proposal ID</th>
              <th>Item Name</th>
              <th>Unit</th>
              <th>Price Per Unit</th>
              <th>Total Price</th>
              <th>Approval</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr>
              <td>P12345</td>
              <td>Laptop</td>
              <td>1</td>
              <td>$1200</td>
              <td>$1200</td>
              <td>
                <Badge color="green" variant="light">
                  Approved
                </Badge>
              </td>
            </tr>

            {/* Row 2 */}
            <tr>
              <td>P67890</td>
              <td>Projector</td>
              <td>2</td>
              <td>$500</td>
              <td>$1000</td>
              <td>
                <Badge color="red" variant="light">
                  Not Approved
                </Badge>
              </td>
            </tr>

            {/* Row 3 */}
            <tr>
              <td>P11223</td>
              <td>Whiteboard</td>
              <td>5</td>
              <td>$150</td>
              <td>$750</td>
              <td>
                <Badge color="red" variant="light">
                  Not Approved
                </Badge>
              </td>
            </tr>
          </tbody>
        </Table>
      </Paper>
    </Container>
  );
}

export default ViewProposalsStatic;
