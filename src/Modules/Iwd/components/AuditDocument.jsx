import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Table,
  Button,
  Title,
  Loader,
  Grid,
  Modal,
} from "@mantine/core";
// import { CaretLeft } from "@phosphor-icons/react";
import axios from "axios";
import ViewRequestFile from "./ViewRequestFile";
import { host } from "../../../routes/globalRoutes";
// import { useDesignations } from "../helper/designationContext"; // Importing the useDesignations hook

function AuditDocuments() {
  const role = useSelector((state) => state.user.role);
  // const designations = useDesignations(); // Accessing designations from context
  const [loading, setLoading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [auditDocumentsList, setAuditDocumentsList] = useState([]); // Initialize state for auditDocumentsList

  // Dummy data is commented out
  // const auditDocumentsList = [
  //   {
  //     requestId: 1,
  //     fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  //     file: "Sample PDF 1",
  //   },
  //   {
  //     requestId: 2,
  //     fileUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-pdf-file.pdf",
  //     file: "Sample PDF 2",
  //   },
  //   {
  //     requestId: 3,
  //     fileUrl: "https://www.africau.edu/images/default/sample.pdf",
  //     file: "Sample PDF 3",
  //   },
  // ];

  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    setModalOpened(true);
  };

  const handleCloseModal = () => {
    setSelectedDocument(null);
    setModalOpened(false);
  };

  useEffect(() => {
    const getAuditDocuments = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken"); // Get auth token from local storage
      try {
        const response = await axios.get(
          `${host}/iwdModuleV2/api/audit-document-view/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
            params: {
              role,
              // designation: currentDesignation, // Pass the designation from context
            },
          },
        );
        setAuditDocumentsList(response.data.data); // Set fetched audit documents to state
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (role) {
      getAuditDocuments(); // Fetch documents only if designation is available
    }
  }, [role]); // Re-run the useEffect when role or designation changes

  return (
    <Container style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <br />
      {loading ? (
        <Grid mt="xl">
          <Container py="xl">
            <Loader size="lg" />
          </Container>
        </Grid>
      ) : (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "25px",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
            borderLeft: "10px solid #1E90FF",
          }}
        >
          <Title size="h3" align="center" style={{ marginBottom: "10px" }}>
            Audit Documents
          </Title>
          <Table highlightOnHover>
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr>
                <th>ID</th>
                <th>File</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {auditDocumentsList.map((document, index) => (
                <tr key={index} id={document.requestId}>
                  <td>{document.requestId}</td>
                  <td>{document.file}</td>
                  <td>
                    <Button
                      size="xs"
                      onClick={() => handleViewDocument(document)}
                      style={{ backgroundColor: "#1E90FF", color: "white" }}
                    >
                      View File
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal
        opened={modalOpened}
        onClose={handleCloseModal}
        size="xl"
        title="View Document"
      >
        {selectedDocument && <ViewRequestFile request={selectedDocument} />}
      </Modal>
    </Container>
  );
}

export default AuditDocuments;
