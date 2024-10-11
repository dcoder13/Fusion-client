import { useNavigate } from "react-router-dom";
import { Text, Flex, Button, Center, Loader } from "@mantine/core";
import CustomBreadcrumbs from "../../components/Breadcrumbs";
import EngineerIssueWorkOrder from "./Pages/EngineerIssueWorkOrder";
import EngineerCreateRequest from "./Pages/EngineerCreateRequest";

function IwdPage() {
  const navigate = useNavigate();
  return (
    <>
      <CustomBreadcrumbs />
      <Flex gap="xs">
        <Button
          size="sm"
          variant="filled"
          color="black"
          style={{
            width: '175px',
            backgroundColor: "black",
            color: "white"
          }}
          onClick={() => { navigate('/iwd/issueWorkOrder') }}
        >
          Issue Work Order
        </Button>
        <Button
          size="sm"
          variant="filled"
          color="black"
          style={{
            width: '175px',
            backgroundColor: "black",
            color: "white"
          }}
          onClick={() => { navigate('/iwd/createRequest') }}
        >
          Create New Request
        </Button>
      </Flex>
    </>
  );
}

export default IwdPage;
