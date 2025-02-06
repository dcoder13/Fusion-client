/* eslint-disable no-restricted-globals */
// /* eslint-disable react/jsx-props-no-spreading */
// import React from "react";
// import PropTypes from "prop-types";
// import { useForm } from "@mantine/form";
// import {
//   Container,
//   Paper,
//   TextInput,
//   Textarea,
//   Button,
//   Flex,
//   Title,
//   Loader,
//   Center,
//   FileInput,
// } from "@mantine/core";
// import { useMediaQuery } from "@mantine/hooks";
// import { HandleProposalSubmission } from "../handlers/handlers";

// function CreateProposalForm({ onBack }) {
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [isSuccess, setIsSuccess] = React.useState(false);
//   const isMobile = useMediaQuery("(max-width: 768px)");

//   const form = useForm({
//     initialValues: {
//       id: "",
//       unit: "",
//       supporting_documents: null,
//       items: [],
//       status: "Pending",
//     },
//   });

//   return (
//     <Container>
//       <Paper
//         radius="md"
//         px="lg"
//         pb="xl"
//         style={{
//           width: isMobile ? "90vw" : "35vw",
//           boxShadow: "none",
//           paddingRight: isMobile ? "132px" : "0",
//         }}
//       >
//         <Flex direction="column" gap="lg">
//           <Title size={isMobile ? "22px" : "26px"} weight={700} pt="sm">
//             Create New Proposal
//           </Title>
//           <form
//             onSubmit={form.onSubmit((values) => {
//               if (form.validate(values)) {
//                 HandleProposalSubmission({
//                   setIsLoading,
//                   setIsSuccess,
//                   form,
//                 });
//               }
//             })}
//           >
//             <TextInput
//               label="request ID"
//               disabled
//               {...form.getInputProps("id")}
//             />
//             <FileInput
//               label="Upload Document (Optional)"
//               {...form.getInputProps("supporting_documents")}
//             />
//             <Flex gap="xs" mt="md" direction={isMobile ? "column" : "row"}>
//               <Button
//                 size="sm"
//                 variant="filled"
//                 color="blue"
//                 type="submit"
//                 style={{
//                   width: isMobile ? "100%" : "100px",
//                   borderRadius: "10px",
//                   backgroundColor: "#1E90FF",
//                   color: "white",
//                 }}
//                 disabled={isLoading || isSuccess}
//               >
//                 {isLoading ? (
//                   <Center>
//                     <Loader color="white" size="xs" />
//                   </Center>
//                 ) : isSuccess ? (
//                   <Center>
//                     <span style={{ color: "white" }}>Success</span>
//                   </Center>
//                 ) : (
//                   "Submit"
//                 )}
//               </Button>
//               <Button
//                 size="sm"
//                 variant="light"
//                 color="gray"
//                 onClick={onBack}
//                 style={{
//                   width: isMobile ? "100%" : "auto",
//                   borderRadius: "20px",
//                 }}
//                 disabled={isLoading}
//               >
//                 Back
//               </Button>
//             </Flex>
//           </form>
//         </Flex>
//       </Paper>
//     </Container>
//   );
// }

// CreateProposalForm.propTypes = {
//   onBack: PropTypes.func.isRequired,
// };

// export default CreateProposalForm;

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
  Divider,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { HandleProposalSubmission } from "../handlers/handlers";

function CreateProposalForm({ onBack }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const form = useForm({
    initialValues: {
      id: "",
      supporting_documents: null,
      items: [
        {
          name: "",
          description: "",
          unit: "",
          price_per_unit: "",
          total_price: "",
          docs: null,
        },
      ],
      status: "Pending",
    },

    validate: (values) => {
      const errors = {};
      values.items.forEach((item, index) => {
        if (!item.name.trim())
          errors[`items.${index}.name`] = "Name is required";
        if (!item.description.trim())
          errors[`items.${index}.description`] = "Description is required";
        if (!item.unit.trim())
          errors[`items.${index}.unit`] = "Unit is required";
        if (!item.price_per_unit || isNaN(Number(item.price_per_unit)))
          errors[`items.${index}.price_per_unit`] = "Valid price is required";
        if (!item.total_price || isNaN(Number(item.total_price)))
          errors[`items.${index}.total_price`] = "Valid total is required";
      });
      return errors;
    },
  });

  const fields = form.values.items.map((_, index) => (
    <div key={index} style={{ position: "relative", marginBottom: 20 }}>
      {index > 0 && (
        <Button
          variant="light"
          color="red"
          size="sm"
          style={{ position: "absolute", top: -10, right: 0 }}
          onClick={() => form.removeListItem("items", index)}
        >
          Remove
        </Button>
      )}
      <Title order={4} mt={index > 0 ? "xl" : "md"} mb="sm">
        Item {index + 1}
      </Title>
      <TextInput
        label="Name"
        required
        placeholder="Enter item name"
        {...form.getInputProps(`items.${index}.name`)}
      />
      <Textarea
        label="Description"
        required
        placeholder="Item description"
        mt="sm"
        {...form.getInputProps(`items.${index}.description`)}
      />
      <Flex gap="md" mt="sm">
        <TextInput
          label="Unit"
          required
          placeholder="e.g., pcs, kg"
          {...form.getInputProps(`items.${index}.unit`)}
        />
        <TextInput
          label="Price Per Unit"
          required
          type="number"
          placeholder="0.00"
          {...form.getInputProps(`items.${index}.price_per_unit`)}
        />
        <TextInput
          label="Total Price"
          required
          type="number"
          placeholder="0.00"
          {...form.getInputProps(`items.${index}.total_price`)}
        />
      </Flex>
      <FileInput
        label="Item Document (Optional)"
        mt="sm"
        {...form.getInputProps(`items.${index}.docs`)}
      />
      <Divider mt="xl" />
    </div>
  ));

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
              label="Request ID"
              disabled
              {...form.getInputProps("id")}
            />

            {fields}

            <Button
              variant="outline"
              fullWidth
              mt="md"
              onClick={() =>
                form.insertListItem("items", {
                  name: "",
                  description: "",
                  unit: "",
                  price_per_unit: "",
                  total_price: "",
                  docs: null,
                })
              }
            >
              Add Item
            </Button>

            <FileInput
              label="Supporting Documents (Optional)"
              placeholder="Choose a file"
              color="black"
              // key={form.key("file")}
              my="sm"
              {...form.getInputProps("supporting_documents")}
            />

            <Flex gap="xs" mt="xl" direction={isMobile ? "column" : "row"}>
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
