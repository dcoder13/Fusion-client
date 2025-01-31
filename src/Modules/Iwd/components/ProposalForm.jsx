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
  CheckIcon,
  FileInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks"; // Import useMediaQuery from @mantine/hooks

function CreateProposalForm({ onBack }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screens

  const form = useForm({
    initialValues: {
      itemId: "",
      proposalId: "",
      itemName: "",
      itemDescription: "",
      unit: "",
      pricePerUnit: "",
      totalPrice: "",
      docs: null, // Optional file input for document upload
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

  const handleSubmit = async (values) => {
    setIsLoading(true);
    console.log("Submitted Values:", values);

    try {
      // Simulate an API call
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onBack();
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Paper
        radius="md"
        px="lg"
        pb="xl"
        style={{
          width: isMobile ? "90vw" : "35vw", // Adjust width for mobile
          boxShadow: "none", // Remove the border shadow
          paddingRight: isMobile ? "132px" : "0", // Add padding right for mobile
        }}
      >
        <Flex direction="column" gap="lg">
          <Title
            size={isMobile ? "22px" : "26px"} // Adjust title size for mobile
            weight={700}
            pt="sm"
          >
            Create New Proposal
          </Title>
          <form onSubmit={form.onSubmit(handleSubmit)}>
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
            <Flex
              gap="xs"
              mt="md"
              direction={isMobile ? "column" : "row"} // Stack buttons vertically on mobile
            >
              <Button
                size="sm"
                variant="filled"
                color="blue"
                type="submit"
                style={{
                  width: isMobile ? "100%" : "100px", // Full width on mobile
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
                    <CheckIcon size="16px" color="white" />
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
                  width: isMobile ? "100%" : "auto", // Full width on mobile
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
