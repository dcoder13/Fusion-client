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
  return (
    <Grid mt="xl">
      {loading ? (
        <Container py="xl">
          <Loader size="lg" />
        </Container>
      ) : sortedNotifications.filter((notification) => !notification.deleted)
          .length === 0 ? (
        <Empty />
      ) : (
        sortedNotifications
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
