import PropTypes from "prop-types";
import { useEffect, useState, useContext, useMemo } from "react";
import {
  Card,
  Text,
  Group,
  Stack,
  Loader,
  Button,
  Flex,
  Center,
  FileInput,
  Textarea,
  Select,
  CheckIcon,
} from "@mantine/core";
import { Paperclip } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import { useForm } from "@mantine/form";
import { DesignationsContext } from "../helper/designationContext";
import classes from "../iwd.module.css";
import { host } from "../../../routes/globalRoutes/index";
import { GetFileData, HandleDirectorApproval } from "../handlers/handlers";

export default function ViewRequestFile({ request, handleBackToList }) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const role = useSelector((state) => state.user.role);
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
    mode: "uncontrolled",
    initialValues: {
      remarks: "",
      file: null,
      designation: null,
    },
    validate: {
      designation: (value) => (value ? null : "Field is required"),
    },
  });
  useEffect(() => {
    GetFileData({ form, setLoading, request, setMessages });
  }, []);
  console.log(messages);
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <div
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "25px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        borderLeft: "10px solid #1e90ff",
        maxWidth: "800px",
        margin: "0 auto",
        marginTop: "20px",
      }}
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        sx={{
          marginBottom: "20px",
          backgroundColor: "#f0f0f0",
        }}
      >
        {loading ? (
          <Loader size="lg" />
        ) : (
          <>
            <Text fw={700}>Created By: - {messages.file.uploader}</Text>
            <Stack spacing="md">
              {messages.tracks.map((message, index) => (
                <Card
                  key={index}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  my="10px"
                  withBorder
                  sx={{
                    marginBottom: "15px",
                  }}
                >
                  <Group position="apart" mb="xs">
                    <Text fw={500}>Sent by: {message.current_id}</Text>
                    <Text size="sm" color="dimmed">
                      {message.forward_date}
                    </Text>
                  </Group>
                  <Text fw={500} mb="xs">
                    Received by: {message.receiver_id}
                  </Text>
                  <Text mb="xs">Remarks: {message.remarks}</Text>
                  {message.upload_file && (
                    <Group spacing="xs">
                      <Paperclip size="1rem" />
                      <Text size="sm">Attachment:</Text>
                      <Button
                        variant="light"
                        component="a"
                        href={`${host}/${message.upload_file}`}
                        target="_blank"
                        radius="md"
                        sx={{
                          textOverflow: "ellipsis",
                          maxWidth: "200px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {message.upload_file.split("/")[2]}
                      </Button>
                    </Group>
                  )}
                </Card>
              ))}
            </Stack>
            {request.processed_by_director === 0 ? (
              <form>
                <Flex gap="xs">
                  <FileInput
                    label="Upload your file"
                    placeholder="Choose a file"
                    key={form.key("file")}
                    my="sm"
                    {...form.getInputProps("file")}
                  />
                </Flex>
                <Flex direction="column" gap="xl">
                  <Textarea
                    placeholder="Remarks"
                    variant="filled"
                    mt="sm"
                    style={{ width: "100%" }}
                    key={form.key("remarks")}
                    {...form.getInputProps("remarks")}
                    backgroundColor="#efefef"
                    cols={50}
                    rows={3}
                  />
                  <Flex direction="column" gap="xs" justify="flex-start">
                    <Select
                      mb="sm"
                      comboboxProps={{ withinPortal: true }}
                      data={designationsList}
                      placeholder="Director(Dir)"
                      label="designation"
                      classNames={classes}
                      key={form.key("designation")}
                      {...form.getInputProps("designation")}
                      required
                    />
                  </Flex>
                </Flex>
                <Flex gap="xs" my="10px">
                  <Button
                    size="sm"
                    variant="filled"
                    color="black"
                    type="submit"
                    style={{
                      width: "auto",
                      backgroundColor: "#1E90FF",
                      color: isSuccess ? "black" : "white",
                      border: "none",
                      borderRadius: "20px",
                    }}
                    disabled={isLoading || isSuccess}
                    onClick={() => {
                      HandleDirectorApproval({
                        form,
                        request,
                        setIsLoading,
                        setIsSuccess,
                        handleBackToList,
                        action: "approve",
                        role,
                      });
                    }}
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
                      "Approve File"
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="filled"
                    color="black"
                    type="submit"
                    style={{
                      width: "auto",
                      backgroundColor: "#1E90FF",
                      color: isSuccess ? "black" : "white",
                      border: "none",
                      borderRadius: "20px",
                    }}
                    disabled={isLoading || isSuccess}
                    onClick={() => {
                      HandleDirectorApproval({
                        form,
                        request,
                        setIsLoading,
                        setIsSuccess,
                        handleBackToList,
                        action: "reject",
                        role,
                      });
                    }}
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
                      "Reject File"
                    )}
                  </Button>
                </Flex>
              </form>
            ) : null}
          </>
        )}
      </Card>
    </div>
    /* eslint-enable react/jsx-props-no-spreading */
  );
}

ViewRequestFile.propTypes = {
  request: PropTypes.shape({
    request_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    requestCreatedBy: PropTypes.string.isRequired,
    file_id: PropTypes.number.isRequired,
    processed_by_director: PropTypes.number.isRequired,
  }).isRequired,
  handleBackToList: PropTypes.func.isRequired,
};
