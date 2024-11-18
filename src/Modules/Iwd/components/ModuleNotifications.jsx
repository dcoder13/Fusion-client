import { Container, Loader, Grid } from "@mantine/core";
import { UseDashboardNotifications } from "../notifications-hook/useDashboardNotifications";
import { NotificationItem } from "../../Dashboard/dashboardNotifications";
import { Empty } from "../../../components/empty";

export default function ModuleNotifications() {
  const {
    loading,
    sortedNotifications,
    markAsRead,
    markAsUnread,
    deleteNotification,
    read_Loading,
  } = UseDashboardNotifications();
  const moduleNotifications = sortedNotifications.filter(
    (notification) => notification.data.module === "iwdModuleV2",
  );
  return (
    <Grid mt="xl">
      {loading ? (
        <Container py="xl">
          <Loader size="lg" />
        </Container>
      ) : moduleNotifications.filter((notification) => !notification.deleted)
          .length === 0 ? (
        <Empty />
      ) : (
        moduleNotifications
          .filter((notification) => !notification.deleted)
          .map((notification) => (
            <NotificationItem
              notification={notification}
              key={notification.id}
              markAsRead={markAsRead}
              markAsUnread={markAsUnread}
              deleteNotification={deleteNotification}
              loading={read_Loading}
            />
          ))
      )}
    </Grid>
  );
}
