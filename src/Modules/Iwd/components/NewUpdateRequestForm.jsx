import React, { useState } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Loader,
  Paper,
  Text,
  Textarea,
  Select,
  Center,
  TextInput,
  Container,
  Group,
  Divider,
  CheckIcon,
} from "@mantine/core";

import PropTypes from "prop-types";

function UpdateRequestForm({ selectedRequest, onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
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

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        onBack();
      }, 1000);
    }, 1000);
  };

  return (
    <Container size="xs" p="lg">
      <form
        onSubmit={form.onSubmit((values) => {
          if (form.validate(values)) handleSubmitButtonClick();
          console.log(values);
        })}
      >
        <Paper
          shadow="md"
          radius="md"
          p="xl"
          withBorder
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "25px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
            borderLeft: "10px solid #1E90FF",
          }}
        >
          {/* Title */}
          <Text
            align="center"
            size="xl"
            weight={700}
            color="black"
            mb="lg"
            style={{ fontWeight: "bold" }}
          >
            Update Request
          </Text>

          <Divider mb="lg" />

          {/* Name Field */}
          <TextInput
            label="Name"
            placeholder="Enter Name"
            readOnly
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...form.getInputProps("name")}
            required
            radius="md"
            mb="md"
          />

          {/* Description Field */}
          <Textarea
            label="Description"
            placeholder="Enter description"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...form.getInputProps("description")}
            required
            radius="md"
            minRows={3}
            mb="md"
          />

          {/* Area Field */}
          <TextInput
            label="Area"
            placeholder="Enter area"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...form.getInputProps("area")}
            required
            radius="md"
            mb="md"
          />

          {/* Select Send To */}
          <Select
            label="Send To"
            placeholder="Select recipient"
            data={["Director", "Dean", "Executive Engineer(dvijay)"]}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...form.getInputProps("sendto")}
            required
            radius="md"
            mb="lg"
          />

          {/* Action Buttons */}
          <Group position="apart" mt="lg">
            <Button
              type="submit"
              size="md"
              radius="xl"
              style={{
                backgroundColor: isSuccess ? "#4BB543" : "#007BFF",
                color: "white",
              }}
              disabled={isLoading || isSuccess}
            >
              {isLoading ? (
                <Center>
                  <Loader color="white" size="xs" />
                </Center>
              ) : isSuccess ? (
                <Center>
                  <CheckIcon size="16px" color="white" />
                </Center>
              ) : (
                "Submit"
              )}
            </Button>

            <Button
              variant="outline"
              size="md"
              radius="xl"
              onClick={onBack}
              disabled={isLoading || isSuccess}
              style={{
                borderColor: "#007BFF",
                color: "#007BFF",
              }}
            >
              Back
            </Button>
          </Group>
        </Paper>
      </form>
    </Container>
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
