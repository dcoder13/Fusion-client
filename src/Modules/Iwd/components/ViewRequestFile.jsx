import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Card, Text, Group, Stack, Loader, Button, Badge } from "@mantine/core";
import { Paperclip } from "@phosphor-icons/react";
import { useForm } from "@mantine/form";
import { host } from "../../../routes/globalRoutes/index";
import { GetFileData } from "../handlers/handlers";
import DeanProcess from "./FileActions/DeanProcess";
import DirectorApproval from "./FileActions/DirectorApproval";
import EngineerProcess from "./FileActions/EngineerProcess";
import ProcessBill from "./FileActions/ProcessBill";
import CreateProposalForm from "./ProposalForm";
import ProposalTable from "./viewproposals";
import ItemTable from "./viewSelectedProposal";

export default function ViewRequestFile({ request, handleBackToList }) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState({});
  const [fileAction, setFileAction] = useState(0);
  const [view, setView] = useState("main");
  const role = useSelector((state) => state.user.role);

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

  const statusBadge = () => {
    if (request.directorApproval === 0)
      return <Badge color="yellow">ONGOING</Badge>;
    if (request.directorApproval === 1)
      return <Badge color="green">APPROVED</Badge>;
    return <Badge color="red">REJECTED</Badge>;
  };

  const fileActionsList = [
    <br />,
    <DeanProcess
      handleBackToList={handleBackToList}
      form={form}
      request={request}
    />,
    <EngineerProcess
      handleBackToList={handleBackToList}
      form={form}
      request={request}
    />,
    <DirectorApproval
      handleBackToList={handleBackToList}
      form={form}
      request={request}
    />,
    <ProcessBill
      handleBackToList={handleBackToList}
      form={form}
      request={request}
    />,
  ];

  useEffect(() => {
    GetFileData({ form, setLoading, request, setMessages });
    if (role === "Director" && request.directorApproval === 0) {
      setFileAction(3);
    } else if (role === "Dean (P&D)" && request.processed_by_dean === 0) {
      setFileAction(1);
    } else {
      setFileAction(2);
    }
  }, []);
  console.log(1, request.active_proposal);
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "1024px",
        margin: "0 auto",
        backgroundColor: "#fff",
        borderLeft: "8px solid #1e90ff",
      }}
    >
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {loading ? (
          <Loader size="lg" />
        ) : view === "proposalForm" ? (
          <CreateProposalForm
            onBack={() => setView("main")}
            request_id={request.request_id}
          />
        ) : view === "proposalTable" ? (
          <ProposalTable
            requestId={request.request_id}
            onBack={() => setView("main")}
          />
        ) : view === "viewItem" ? (
          <ItemTable
            requestId={request.request_id}
            onBack={() => setView("main")}
          />
        ) : (
          <>
            <Group position="apart" mb="md">
              <Text fw={700} size="xl" style={{ color: "#1e90ff" }}>
                Request Information
              </Text>
              {statusBadge()}
            </Group>
            <Group position="apart" mb="md">
              <Text style={{ color: "#1e90ff", fontWeight: 600 }}>
                Created By:
              </Text>
              <Text>{messages.file?.uploader || "N/A"}</Text>
            </Group>
            <Text size="lg" mt="md" fw={500} style={{ color: "#1e90ff" }}>
              File Tracking Information
            </Text>
            <Stack spacing="md">
              {messages.tracks?.map((message, index) => (
                <Card
                  key={index}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                >
                  <Group position="apart">
                    <Text style={{ color: "#1e90ff", fontWeight: 600 }}>
                      Sent by:
                    </Text>
                    <Text>{message.current_id}</Text>
                  </Group>
                  <Group position="apart">
                    <Text style={{ color: "#1e90ff", fontWeight: 600 }}>
                      Sent Date & Time:
                    </Text>
                    <Text>{message.forward_date || "N/A"}</Text>
                  </Group>
                  <Group position="apart">
                    <Text style={{ color: "#1e90ff", fontWeight: 600 }}>
                      Received by:
                    </Text>
                    <Text>{message.receiver_id || "N/A"}</Text>
                  </Group>
                  <Text style={{ color: "#1e90ff", fontWeight: 600 }}>
                    Remarks:
                  </Text>
                  <Text>{message.remarks}</Text>
                  {message.upload_file && (
                    <Group spacing="xs" mt="xs">
                      <Paperclip size="1rem" />
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

            <Group spacing="md" mt="md">
              {request.active_proposal != null ? null : (
                <Button
                  variant="light"
                  radius="md"
                  onClick={() => setView("proposalForm")}
                  sx={{
                    textOverflow: "ellipsis",
                    maxWidth: "200px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  Proposal Form
                </Button>
              )}
              <Button
                variant="light"
                radius="md"
                onClick={() => setView("proposalTable")}
                sx={{
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                View Proposals
              </Button>

              <Button
                variant="light"
                radius="md"
                onClick={() => setView("viewItem")}
                sx={{
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                View Items
              </Button>
            </Group>

            {fileActionsList[fileAction]}
          </>
        )}
      </Card>
    </div>
  );
}

ViewRequestFile.propTypes = {
  request: PropTypes.shape({
    request_id: PropTypes.number.isRequired,
    name: PropTypes.string,
    area: PropTypes.string,
    description: PropTypes.string,
    requestCreatedBy: PropTypes.string,
    file_id: PropTypes.number.isRequired,
    directorApproval: PropTypes.number,
    processed_by_dean: PropTypes.number,
    issuedWorkOrder: PropTypes.number,
    workCompleted: PropTypes.number,
    active_proposal: PropTypes.number,
  }).isRequired,
  handleBackToList: PropTypes.func.isRequired,
};
