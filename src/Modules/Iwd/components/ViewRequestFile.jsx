import { Card, Text, Group, Stack, Badge } from "@mantine/core";
import { Paperclip } from "@phosphor-icons/react";

export default function ViewRequestFile() {
  const messages = [
    {
      sentBy: "dvijay - Executive Engineer (Civil)",
      sentDate: "Oct. 16, 2024, 8:53 p.m.",
      receivedBy: "bhartenduks-Director",
      remarks: "File with id:617 created by dvijay and sent to bhartenduks",
      attachments: ["creation_file.docx"],
    },
    {
      sentBy: "bhartenduks - Director",
      sentDate: "Oct. 16, 2024, 8:54 p.m.",
      receivedBy: "dvijay-Executive Engineer (Civil)",
      remarks: "No Remarks",
      attachments: ["requst_ID10110.jpg"],
    },
    {
      sentBy: "dvijay - Executive Engineer (Civil)",
      sentDate: "Oct. 16, 2024, 8:59 p.m.",
      receivedBy: "richard-Accounts Admin",
      remarks: "No Remarks",
      attachments: ["Request_id_2_final_bill.pdf"],
    },
  ];

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
        <Text fw={700}>Created By: - Executive Engineer (Civil)</Text>
      </Card>
      <Stack spacing="md">
        {messages.map((message, index) => (
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
              <Text fw={500}>Sent by: {message.sentBy}</Text>
              <Text size="sm" color="dimmed">
                {message.sentDate}
              </Text>
            </Group>
            <Text fw={500} mb="xs">
              Received by: {message.receivedBy}
            </Text>
            <Text mb="xs">Remarks: {message.remarks}</Text>
            {message.attachments.length > 0 && (
              <Group spacing="xs">
                <Paperclip size="1rem" />
                <Text size="sm">Attachment:</Text>
                {message.attachments.map((attachment, idx) => (
                  <Badge
                    key={idx}
                    variant="light"
                    sx={{
                      textOverflow: "ellipsis",
                      maxWidth: "200px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {attachment}
                  </Badge>
                ))}
              </Group>
            )}
          </Card>
        ))}
      </Stack>
    </div>
  );
}
