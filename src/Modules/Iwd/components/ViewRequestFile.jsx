import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Text, Group, Stack, Badge, Loader } from "@mantine/core";
import { Paperclip } from "@phosphor-icons/react";
import { host } from "../../../routes/globalRoutes";

export default function ViewRequestFile({ request }) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const getRequestData = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(`${host}/iwdModuleV2/api/view-file/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
          params: {
            request_id: request.request_id,
            name: request.name,
            area: request.area,
            description: request.description,
            requestCreatedBy: request.requestCreatedBy,
            file_id: request.file_id,
          },
        });
        setMessages(response.data);
        console.log("re", response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getRequestData();
  }, []);
  console.log(messages);

  return (
    <div
      style={{
        padding: "20px",
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
                      {/* {message.attachments.map((attachment, idx) => ( */}
                      <Badge
                        variant="light"
                        sx={{
                          textOverflow: "ellipsis",
                          maxWidth: "200px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {message.upload_file}
                      </Badge>
                      {/* ))} */}
                    </Group>
                  )}
                </Card>
              ))}
            </Stack>
          </>
        )}
      </Card>
    </div>
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
  }).isRequired,
};
