/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { useForm } from "@mantine/form";
import {
  Container,
  Paper,
  TextInput,
  Textarea,
  Button,
  Flex,
  Title,
  Loader,
  Center,
  FileInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { HandleProposalSubmission } from "../handlers/handlers";

function CreateProposalForm({ onBack }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const form = useForm({
    initialValues: {
      itemId: "",
      proposalId: "",
      itemName: "",
      itemDescription: "",
      unit: "",
      pricePerUnit: "",
      totalPrice: "",
      docs: null,
    },
    validate: {
      itemId: (value) => (value ? null : "Item ID is required"),
      proposalId: (value) => (value ? null : "Proposal ID is required"),
      itemName: (value) => (value ? null : "Item Name is required"),
      pricePerUnit: (value) =>
        value && !Number.isNaN(Number(value))
          ? null
          : "Price per Unit must be a number",
      totalPrice: (value) =>
        value && !Number.isNaN(Number(value))
          ? null
          : "Total Price must be a number",
    },
  });

  return (
    <Container>
      <Paper
        radius="md"
        px="lg"
        pb="xl"
        style={{
          width: isMobile ? "90vw" : "35vw",
          boxShadow: "none",
          paddingRight: isMobile ? "132px" : "0",
        }}
      >
        <Flex direction="column" gap="lg">
          <Title size={isMobile ? "22px" : "26px"} weight={700} pt="sm">
            Create New Proposal
          </Title>
          <form
            onSubmit={form.onSubmit((values) => {
              if (form.validate(values)) {
                HandleProposalSubmission({
                  setIsLoading,
                  setIsSuccess,
                  form,
                });
              }
            })}
          >
            <TextInput
              label="Item ID"
              required
              {...form.getInputProps("itemId")}
            />
            <TextInput
              label="Proposal ID"
              required
              {...form.getInputProps("proposalId")}
            />
            <TextInput
              label="Item Name"
              required
              {...form.getInputProps("itemName")}
            />
            <Textarea
              label="Item Description"
              {...form.getInputProps("itemDescription")}
            />
            <TextInput label="Unit" {...form.getInputProps("unit")} />
            <TextInput
              label="Price Per Unit"
              required
              {...form.getInputProps("pricePerUnit")}
            />
            <TextInput
              label="Total Price"
              required
              {...form.getInputProps("totalPrice")}
            />
            <FileInput
              label="Upload Document (Optional)"
              {...form.getInputProps("docs")}
            />
            <Flex gap="xs" mt="md" direction={isMobile ? "column" : "row"}>
              <Button
                size="sm"
                variant="filled"
                color="blue"
                type="submit"
                style={{
                  width: isMobile ? "100%" : "100px",
                  borderRadius: "10px",
                  backgroundColor: "#1E90FF",
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
                    <span style={{ color: "white" }}>Success</span>
                  </Center>
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                size="sm"
                variant="light"
                color="gray"
                onClick={onBack}
                style={{
                  width: isMobile ? "100%" : "auto",
                  borderRadius: "20px",
                }}
                disabled={isLoading}
              >
                Back
              </Button>
            </Flex>
          </form>
        </Flex>
      </Paper>
    </Container>
  );
}

CreateProposalForm.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default CreateProposalForm;
