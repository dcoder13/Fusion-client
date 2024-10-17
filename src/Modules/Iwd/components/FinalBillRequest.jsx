function FinalBillRequest() {
  const handleGenerateFinalBill = (request) => {
    // TODO:
    console.log(request);
  };
  const RequestsInProgressData = [
    {
      id: "1",
      name: "divyansh",
      description: "ahgo",
      area: "lhtc",
      completed: false,
      "created-by": "me",
    },
    {
      id: "3",
      name: "dvijay",
      description: "ahgo",
      area: "lhtc",
      completed: true,
      "created-by": "me",
    },
    {
      id: "4",
      name: "suniljatt",
      description: "ahgo",
      area: "lhtc",
      completed: false,
      "created-by": "me",
    },
  ];
  return (
    <div className="container">
      <div className="work-orders-table">
        <div className="table-header">
          <span className="issue-work-order-button">Details</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Area</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {RequestsInProgressData.map((request, index) => (
              <tr key={index} id={request.id}>
                <td>{request.id}</td>
                <td>{request.name}</td>
                <td>{request.description}</td>
                <td>{request.area}</td>
                <td>{request["created-by"]}</td>
                <td>
                  <button
                    className="issue-work-order-button"
                    onClick={() => handleGenerateFinalBill(request)}
                  >
                    Generate Bill
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FinalBillRequest;

const styles = `
  .body {
    background-color: #efefef; 
    margin: 0; 
    padding: 0; 
    font-family: Arial, sans-serif; 
  }
  /* Basic container styling */
  .container {
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  /* Breadcrumb styling */
  .breadcrumb {
    font-size: 20px;
    margin-bottom: 20px;
  }

  /* Tabs styling */
  .tabs {
    margin-bottom: 20px;
  }

  .buttons-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .buttons-container button {
    padding: 10px 15px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-weight: normal;
  }
  .bold-button {
    font-weight: bold; 
    padding: 10px 15px; 
    border: 1px solid #ccc; 
    background-color: transparent; 
    cursor: pointer;
  }
  .buttons-container button:hover {
    font-weight: bold;
  }
    .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px; 
    border: 1px solid #ccc; 
    border-radius: 50%;
    background-color: #f0f0f0; 
    cursor: pointer;
    font-size: 18px;
  }

  .arrow:hover {
    background-color: #e0e0e0; 
  }

  /* Work Orders Table */
  .work-orders-table {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
   border-radius: 25px;
   border-left: 10px solid #1E90FF;
  }

  .table-header {
    font-weight: bold;
    background-color: #f5f5f5;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  table th, table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ccc;
  }

  .issue-work-order-button {
    padding: 10px 20px;
    margin-right:10px;
    background-color: #1E90FF;
    color: white;
    border: none;
    cursor: pointer;
    border-radius:20px;
  }

  .issue-work-order-button:hover {
    background-color: #0056b3;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
