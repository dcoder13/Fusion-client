import React, { useState } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Flex,
  Grid,
  Loader,
  Paper,
  Text,
  Textarea,
  Select,
  Center,
  CheckIcon,
  TextInput,
} from "@mantine/core";
import PropTypes from "prop-types";
import classes from "../iwd.module.css";

function UpdateRequestForm({ selectedRequest, onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: selectedRequest.name,
      description: selectedRequest.description,
      area: selectedRequest.area,
      sendto: null,
    },
    validate: {
      name: (value) => (value ? null : "Field is required"),
      description: (value) => (value ? null : "Field is required"),
      area: (value) => (value ? null : "Field is required"),
      sendto: (value) => (value ? null : "Field is required"),
    },
  });
  const handleSubmitButtonClick = () => {
    setIsLoading(true);
    setIsSuccess(false);
    // TODO:

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        onBack();
      }, 1000);
    }, 1000);
  };

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <Grid mt="xl">
      <div className="container">
        <form
          onSubmit={form.onSubmit((values) => {
            if (form.validate(values)) handleSubmitButtonClick();
            console.log(values);
          })}
        >
          <Paper
            radius="md"
            px="lg"
            pt="sm"
            pb="xl"
            style={{
              borderLeft: "0.6rem solid #15ABFF",
              width: "30vw",
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
                  Update Request
                </Text>
              </Flex>

              <Flex direction="column" gap="xs" justify="flex-start">
                <TextInput
                  label="Name"
                  placeholder=""
                  classNames={classes}
                  key={form.key("name")}
                  {...form.getInputProps("name")}
                  readOnly
                />
              </Flex>

              <Flex direction="column" gap="xs">
                <Textarea
                  placeholder="Description"
                  variant="filled"
                  key={form.key("description")}
                  {...form.getInputProps("description")}
                  style={{ width: "100%" }}
                  required
                  backgroundColor="#efefef"
                  cols={50}
                  rows={3}
                />
              </Flex>

              <Flex direction="column" gap="xs" justify="flex-start">
                <TextInput
                  label="Area"
                  placeholder="area"
                  classNames={classes}
                  key={form.key("area")}
                  {...form.getInputProps("area")}
                  required
                />
              </Flex>

              <Flex direction="column" gap="xs" justify="flex-start">
                <Select
                  mt="md"
                  comboboxProps={{ withinPortal: true }}
                  data={["Director", "Dean", "Executive Engineer(dvijay)"]}
                  placeholder="select"
                  label="Send To"
                  classNames={classes}
                  key={form.key("sendto")}
                  {...form.getInputProps("sendto")}
                  required
                />
              </Flex>

              <Flex gap="xs">
                <Button
                  size="sm"
                  type="submit"
                  variant="filled"
                  color="black"
                  style={{
                    width: "100px",
                    backgroundColor: "#1E90FF",
                    color: isSuccess ? "black" : "white",
                    border: "none",
                    borderRadius: "20px",
                  }}
                  // onClick={handleSubmitButtonClick}
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
        </form>
      </div>
    </Grid>
    /* eslint-enable react/jsx-props-no-spreading */
  );
}

UpdateRequestForm.propTypes = {
  selectedRequest: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    area: PropTypes.string,
    "created-by": PropTypes.string,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default UpdateRequestForm;
