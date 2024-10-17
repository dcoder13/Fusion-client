import { useState, useRef } from "react";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import { Tabs, Button, Flex, Text } from "@mantine/core";
import CustomBreadcrumbs from "../../components/Breadcrumbs";
import classes from "../Dashboard/Dashboard.module.css";
import ModuleNotifications from "./components/ModuleNotifications";
import CreateRequest from "./components/CreateRequestForm";
import IssueWorkOrder from "./components/IssueWorkOrder";
import RejectedRequests from "./components/RejectedRequest";
import RequestsInProgress from "./components/RequestsInProgress";
import FinalBillRequest from "./components/FinalBillRequest";
import ManageBudget from "./components/ManageBudget";
import CreatedRequests from "./components/CreatedRequests";
import ViewBudget from "./components/ViewBudget";
import ProcessedBills from "./components/ProcessedBills";

function IwdPage() {
  const [activeTab, setActiveTab] = useState("0");
  const tabsListRef = useRef(null);
  const tabItems = [
    { title: "Notifications", component: <ModuleNotifications /> },
    {
      title: "Create Request",
      component: <CreateRequest setActiveTab={setActiveTab} />,
    },
    { title: "Issue Work Order", component: <IssueWorkOrder /> },
    { title: "Generate Final Bill", component: <FinalBillRequest /> },
    { title: "Rejected Requests", component: <RejectedRequests /> },
    { title: "Requests in Progress", component: <RequestsInProgress /> },
    { title: "Manage Budget", component: <ManageBudget /> },
    { title: "Created Requests", component: <CreatedRequests /> },
    { title: "View Budget", component: <ViewBudget /> },
    { title: "Processed Bills", component: <ProcessedBills /> },
  ];
  const handleTabChange = (direction) => {
    const newIndex =
      direction === "next"
        ? Math.min(+activeTab + 1, tabItems.length - 1)
        : Math.max(+activeTab - 1, 0);
    setActiveTab(String(newIndex));
    tabsListRef.current.scrollBy({
      left: direction === "next" ? 50 : -50,
      behavior: "smooth",
    });
  };
  return (
    <>
      <CustomBreadcrumbs />
      <Flex
        justify="flex-start"
        align="center"
        gap={{ base: "0.5rem", md: "1rem" }}
        mt={{ base: "1rem", md: "1.5rem" }}
        ml={{ md: "lg" }}
      >
        <Button
          onClick={() => handleTabChange("prev")}
          variant="default"
          p={0}
          style={{ border: "none" }}
        >
          <CaretCircleLeft
            className={classes.fusionCaretCircleIcon}
            weight="light"
          />
        </Button>

        <div className={classes.fusionTabsContainer} ref={tabsListRef}>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List style={{ display: "flex", flexWrap: "nowrap" }}>
              {tabItems.map((item, index) => (
                <Tabs.Tab
                  value={`${index}`}
                  key={index}
                  className={
                    activeTab === `${index}`
                      ? classes.fusionActiveRecentTab
                      : ""
                  }
                >
                  <Text>{item.title}</Text>
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </div>

        <Button
          onClick={() => handleTabChange("next")}
          variant="default"
          p={0}
          style={{ border: "none" }}
        >
          <CaretCircleRight
            className={classes.fusionCaretCircleIcon}
            weight="light"
          />
        </Button>
      </Flex>
      {tabItems[parseInt(activeTab, 10)].component}
    </>
  );
}

export default IwdPage;
