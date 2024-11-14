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

// import { DesignationsContext } from "../helper/designationContext";
import axios from "axios";
import { host } from "../../../routes/globalRoutes";
import "./AuditDocuments.css"; // Import the CSS file

function AuditDocuments() {
  const role = useSelector((state) => state.user.role);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  // const designations = useContext(DesignationsContext);

  // Dummy audit documents list with fake file URLs

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

  // Fetching API call
  const [auditDocumentsList, setAuditDocumentList] = useState([]);

  useEffect(() => {
    const getAuditDocuments = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          `${host}/iwdModuleV2/api/audit-document-view/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
            params: {
              role,
            },
          },
        );
        setAuditDocumentList(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getAuditDocuments();
  }, [role]);

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setModalOpened(true);
  };

  const handleBackToList = () => {
    setSelectedRequest(null);
    setModalOpened(false);
  };

  return (
    <Container className="audit-container">
      <br />
      {loading ? (
        <Grid mt="xl">
          <Container py="xl">
            <Loader size="lg" />
          </Container>
        </Grid>
      ) : (
        <div className="audit-box">
          <Title size="h3" className="audit-title">
            Audit Documents
          </Title>

          <Table highlightOnHover>
            <thead className="table-header">
              <tr>
                <th className="table-cell-center">File Name</th>
                <th className="table-cell-center">File</th>
                <th className="table-cell-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {auditDocumentsList.map((document, index) => (
                <tr key={index} id={document.requestId}>
                  <td className="table-cell-center">{document.file}</td>
                  <td className="table-cell-center">
                    <Button
                      size="xs"
                      onClick={() => handleViewRequest(document)}
                      className="button-view-file"
                    >
                      View File
                    </Button>
                  </td>
                  <td className="button-group">
                    <Button size="xs" className="button-approve">
                      Approve
                    </Button>
                    <Button size="xs" className="button-reject">
                      Reject
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
        onClose={handleBackToList}
        title="View Document"
        size="lg"
        className="modal-overlay"
      >
        {selectedRequest && (
          <iframe
            src={selectedRequest.fileUrl}
            title="Document Viewer"
            width="100%"
            height="500px"
            style={{ border: "none" }}
          />
        )}
      </Modal>
    </Container>
  );
}

// AuditDocuments.propTypes = {
//   setActiveTab: PropTypes.func,
// };

export default AuditDocuments;
