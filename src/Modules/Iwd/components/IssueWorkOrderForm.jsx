import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Flex,
  Grid,
  Loader,
  Paper,
  Title,
  Center,
  CheckIcon,
  TextInput,
  NumberInput,
  Notification,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import PropTypes from "prop-types";
import classes from "./EngineerIssueWorkOrder.module.css";
import { IWD_ROUTES } from "../routes/iwdRoutes";

function IssueWorkOrderForm({ workOrder, onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dateError, setDateError] = useState("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      request_id: workOrder.id,
      name: workOrder.name,
      amount: null,
      deposit: null,
      start_date: null,
      completion_date: null,
      alloted_time: null,
    },
    validate: {
      amount: (value) => (value ? null : "Field is required"),
      start_date: (value) => (value ? null : "Field is required"),
      completion_date: (value) => (value ? null : "Field is required"),
      alloted_time: (value) => (value ? null : "Field is required"),
    },
  });

  const handleSubmitButtonClick = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);
    setIsSuccess(false);
    setDateError(""); // Reset error
    const token = localStorage.getItem("authToken");
    const data = form.getValues();

    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const isValidDate = (dateStr) => {
      const date = new Date(dateStr);
      return !Number.isNaN(date.getTime());
    };

    const isPastDate = (dateStr) => {
      const today = new Date();
      const inputDate = new Date(dateStr);
      return inputDate < today;
    };

    if (data.start_date) {
      if (!isValidDate(data.start_date)) {
        setDateError("Invalid start date format");
        setIsLoading(false);
        return;
      }
      if (isPastDate(data.start_date)) {
        setDateError("Start date cannot be a past date");
        setIsLoading(false);
        return;
      }
      data.start_date = formatDate(data.start_date);
    }

    if (data.completion_date) {
      if (!isValidDate(data.completion_date)) {
        setDateError("Invalid completion date format");
        setIsLoading(false);
        return;
      }
      if (isPastDate(data.completion_date)) {
        setDateError("Completion date cannot be a past date");
        setIsLoading(false);
        return;
      }
      data.completion_date = formatDate(data.completion_date);
    }

    // Validate that start_date <= completion_date
    if (data.start_date && data.completion_date) {
      const startDate = new Date(data.start_date);
      const completionDate = new Date(data.completion_date);
      if (startDate > completionDate) {
        setDateError("Start date cannot be later than completion date");
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await axios.post(IWD_ROUTES.ISSUE_WORK_ORDER, data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Grid mt="s">
      <div className="contain">
        <form onSubmit={handleSubmitButtonClick}>
          <Paper
            radius="md"
            px="lg"
            pt="sm"
            pb="xl"
            style={{
              borderLeft: "0.6rem solid #15ABFF",
              width: "60vw",
              minHeight: "45vh",
              maxHeight: "70vh",
              marginBottom: "10px",
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
                <Title size="26px">Issue Work Order</Title>
              </Flex>

              <Grid columns="2" style={{ width: "100%" }}>
                <Grid.Col span={1}>
                  <Flex direction="column" gap="xs">
                    <TextInput
                      label="Request ID"
                      readOnly
                      classNames={classes}
                      key={form.key("request_id")}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...form.getInputProps("request_id")}
                    />
                  </Flex>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Flex direction="column" gap="xs">
                    <TextInput
                      label="Request Name"
                      readOnly
                      classNames={classes}
                      key={form.key("name")}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...form.getInputProps("name")}
                    />
                  </Flex>
                </Grid.Col>
              </Grid>

              <Grid columns="2" style={{ width: "100%" }}>
                <Grid.Col span={1}>
                  <Flex direction="column" gap="xs">
                    <TextInput
                      label="Date"
                      placeholder="yyyy/mm/dd"
                      classNames={classes}
                      key={form.key("date")}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...form.getInputProps("date")}
                      required
                    />
                  </Flex>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Flex direction="column" gap="xs">
                    <TextInput
                      label="Agency"
                      placeholder="Agency Name"
                      classNames={classes}
                      key={form.key("agency")}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...form.getInputProps("agency")}
                      required
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
                      key={form.key("amount")}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...form.getInputProps("amount")}
                      required
                    />
                  </Flex>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Flex direction="column" gap="xs">
                    <NumberInput
                      label="Deposit"
                      placeholder="Enter deposit"
                      classNames={classes}
                      key={form.key("deposit")}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...form.getInputProps("deposit")}
                    />
                  </Flex>
                </Grid.Col>
              </Grid>

              <Flex direction="column" gap="xs" justify="flex-start">
                <TextInput
                  label="Alloted Time"
                  placeholder="Enter allotted time"
                  classNames={classes}
                  key={form.key("alloted_time")}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...form.getInputProps("alloted_time")}
                  style={{ width: "100%" }}
                />
              </Flex>

              <Grid columns="1" style={{ width: "100%" }}>
                <Grid.Col span={1}>
                  <Flex direction="column" gap="xs">
                    <TextInput
                      label="Start Date"
                      placeholder="yyyy/mm/dd"
                      classNames={classes}
                      key={form.key("start_date")}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...form.getInputProps("start_date")}
                      required
                    />
                  </Flex>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Flex direction="column" gap="xs">
                    <TextInput
                      label="Completion Date"
                      placeholder="yyyy/mm/dd"
                      classNames={classes}
                      key={form.key("completion_date")}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...form.getInputProps("completion_date")}
                      required
                    />
                  </Flex>
                </Grid.Col>
              </Grid>

              {dateError && (
                <Notification
                  color="red"
                  title="Error"
                  onClose={() => setDateError("")}
                >
                  {dateError}
                </Notification>
              )}

              <Flex direction="row-reverse" gap="xs">
                <Button
                  size="sm"
                  variant="filled"
                  color="black"
                  type="submit"
                  style={{
                    width: "100px",
                    backgroundColor: "#1E90FF",
                    color: isSuccess ? "black" : "white",
                    border: "none",
                    borderRadius: "20px",
                  }}
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
                  color="gray"
                  onClick={onBack}
                  style={{ width: "100px", backgroundColor: "#B0B0B0" }}
                >
                  Back
                </Button>
              </Flex>
            </Flex>
          </Paper>
        </form>
      </div>
    </Grid>
  );
}

IssueWorkOrderForm.propTypes = {
  workOrder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    area: PropTypes.string,
    "created-by": PropTypes.string,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default IssueWorkOrderForm;
