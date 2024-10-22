import React, { useState, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Flex,
  Grid,
  Loader,
  Paper,
  Textarea,
  Select,
  CheckIcon,
  TextInput,
  Title,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import PropTypes from "prop-types";
import axios from "axios";
import classes from "../iwd.module.css";
import { host } from "../../../routes/globalRoutes";
import { DesignationsContext } from "../helper/designationContext";

function CreateRequest({ setActiveTab }) {
  const role = useSelector((state) => state.user.role);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const designations = useContext(DesignationsContext);
  const designationsList = useMemo(
    () =>
      designations.map(
        (designation) =>
          `${designation.designation.name}|${designation.username}`,
      ),
    [designations],
  );

  const form = useForm({
    mode: "controlled",
    initialValues: {
      name: null,
      description: null,
      area: null,
      designation: null,
    },
    validate: {
      name: (value) => (value ? null : "Field is required"),
      description: (value) => (value ? null : "Field is required"),
      area: (value) => (value ? null : "Field is required"),
      designation: (value) => (value ? null : "Field is required"),
    },
  });

  const handleSubmitButtonClick = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    const token = localStorage.getItem("authToken");
    const data = form.getValues();
    data.role = role;
    console.log(data);
    try {
      const response = await axios.post(
        `${host}/iwdModuleV2/api/requests-view/`,
        data,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      console.log(response);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          setActiveTab("0");
        }, 500);
      }, 1000);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Grid mt="xl" justify="center">
      <div className={classes.parentContainer}>
        <form
          onSubmit={form.onSubmit((values) => {
            if (form.validate(values)) handleSubmitButtonClick();
          })}
          className={`${classes.issueWorkOrderForm} ${classes.containerDiv}`}
        >
          <Paper
            radius="md"
            p="xl"
            style={{
              borderLeft: "10px solid #1E90FF",
              width: "50%",
              borderRadius: "25px",
              backgroundColor: "white",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
            }}
            withBorder
          >
            <Flex
              direction="column"
              gap="lg"
              style={{ textAlign: "left", width: "100%" }}
            >
              <Title order={3} align="center" style={{ color: "black" }}>
                New Request
              </Title>
              <Divider />

              <TextInput
                label="Name"
                placeholder="Enter your name"
                required
                key={form.key("name")}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...form.getInputProps("name")}
                classNames={classes.input}
              />

              <Textarea
                label="Description"
                placeholder="Describe the request"
                required
                variant="filled"
                key={form.key("description")}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...form.getInputProps("description")}
                classNames={classes.input}
                minRows={3}
              />

              <TextInput
                label="Area"
                placeholder="Enter the area"
                required
                key={form.key("area")}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...form.getInputProps("area")}
                classNames={classes.input}
              />

              <Select
                label="Designation"
                placeholder="Select designation"
                data={designationsList}
                required
                key={form.key("designation")}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...form.getInputProps("designation")}
                classNames={classes.input}
              />

              <Flex justify="center" mt="md">
                <Button
                  size="md"
                  variant="filled"
                  type="submit"
                  style={{
                    width: "150px",
                    backgroundColor: "#1E90FF",
                    color: "white",
                    borderRadius: "20px",
                  }}
                  disabled={isLoading || isSuccess}
                >
                  {isLoading ? (
                    <Loader color="white" size="sm" />
                  ) : isSuccess ? (
                    <CheckIcon size="16px" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Flex>
            </Flex>
          </Paper>
        </form>
      </div>
    </Grid>
  );
}

CreateRequest.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
};

export default CreateRequest;
