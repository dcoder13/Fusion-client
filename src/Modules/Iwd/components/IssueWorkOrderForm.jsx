import React, { useState } from "react";
import {
  Button,
  Flex,
  Grid,
  Loader,
  Paper,
  Text,
  Center,
  CheckIcon,
  TextInput,
  NumberInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import PropTypes from "prop-types";
import classes from "./EngineerIssueWorkOrder.module.css";

function IssueWorkOrderForm({ workOrder, onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dateValue, setDateValue] = useState(null);

  const handleSubmitButtonClick = () => {
    setIsLoading(true);
    setIsSuccess(false);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        onBack();
      }, 1000);
    }, 1000);
  };

  return (
    <Grid mt="xl">
      <div className="container">
        <Paper
          radius="md"
          px="lg"
          pt="sm"
          pb="xl"
          style={{
            borderLeft: "0.6rem solid #15ABFF",
            width: "70vw",
            minHeight: "45vh",
            maxHeight: "70vh",
          }}
          withBorder
          maw="1240px"
          backgroundColor="white"
        >
          <Flex
            direction="column"
            gap="lg"
            style={{ textAlign: "left", width: "100%", fontFamily: "Arial" }}
          >
            <Flex direction="column">
              <Text size="22px" style={{ fontWeight: "bold" }}>
                Issue Work Order
              </Text>
            </Flex>

            <Grid columns="2" style={{ width: "100%" }}>
              <Grid.Col span={1}>
                <Flex direction="column" gap="xs">
                  <TextInput
                    label="Request ID"
                    value={workOrder.id}
                    readOnly
                    classNames={classes}
                  />
                </Flex>
              </Grid.Col>
              <Grid.Col span={1}>
                <Flex direction="column" gap="xs">
                  <TextInput
                    label="Request Name"
                    value={workOrder.name}
                    readOnly
                    classNames={classes}
                  />
                </Flex>
              </Grid.Col>
            </Grid>

            <Grid columns="2" style={{ width: "100%" }}>
              <Grid.Col span={1}>
                <Flex direction="column" gap="xs">
                  <DateInput
                    value={dateValue}
                    onChange={setDateValue}
                    label="Date"
                    placeholder="dd/mm/yyyy"
                    classNames={classes}
                  />
                </Flex>
              </Grid.Col>
              <Grid.Col span={1}>
                <Flex direction="column" gap="xs">
                  <TextInput
                    label="Agency"
                    placeholder="Agency Name"
                    classNames={classes}
                  />
                </Flex>
              </Grid.Col>
            </Grid>

            <Grid columns="2" style={{ width: "100%" }}>
              <Grid.Col span={1}>
                <Flex direction="column" gap="xs">
                  <NumberInput
                    label="Amount"
                    description=""
                    placeholder="Enter amount"
                    classNames={classes}
                  />
                </Flex>
              </Grid.Col>
              <Grid.Col span={1}>
                <Flex direction="column" gap="xs">
                  <NumberInput
                    label="Deposit"
                    description=""
                    placeholder="Enter deposit"
                    classNames={classes}
                  />
                </Flex>
              </Grid.Col>
            </Grid>

            <Flex direction="column" gap="xs" justify="flex-start">
              <TextInput
                label="Alloted Time"
                placeholder="Enter allotted time"
                classNames={classes}
                style={{ width: "50%" }}
              />
            </Flex>

            <Grid columns="2" style={{ width: "100%" }}>
              <Grid.Col span={1}>
                <Flex direction="column" gap="xs">
                  <DateInput
                    value={dateValue}
                    onChange={setDateValue}
                    label="Start Date"
                    placeholder="dd/mm/yyyy"
                    classNames={classes}
                  />
                </Flex>
              </Grid.Col>
              <Grid.Col span={1}>
                <Flex direction="column" gap="xs">
                  <DateInput
                    value={dateValue}
                    onChange={setDateValue}
                    label="End Date"
                    placeholder="dd/mm/yyyy"
                    classNames={classes}
                  />
                </Flex>
              </Grid.Col>
            </Grid>

            <Flex direction="row-reverse" gap="xs">
              <Button
                size="sm"
                variant="filled"
                color="black"
                style={{
                  width: "100px",
                  backgroundColor: "#1E90FF",
                  color: isSuccess ? "black" : "white",
                  border: "none",
                  borderRadius: "20px",
                }}
                onClick={handleSubmitButtonClick}
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (
                  <Center>
                    <Loader color="black" size="xs" />
                  </Center>
                ) : isSuccess ? (
                  <Center>
                    <CheckIcon size="16px" color="black" />
                  </Center>
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                size="sm"
                variant="filled"
                color="#1E90FF"
                onClick={onBack}
                disabled={isLoading || isSuccess}
                style={{
                  border: "none",
                  borderRadius: "20px",
                }}
              >
                Back
              </Button>
            </Flex>
          </Flex>
        </Paper>
      </div>
    </Grid>
  );
}

IssueWorkOrderForm.propTypes = {
  workOrder: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    area: PropTypes.string,
    "created-by": PropTypes.string,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default IssueWorkOrderForm;
