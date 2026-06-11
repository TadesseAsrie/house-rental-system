// src/pages/shared/NotificationPage.jsx
import React from "react";
import { useApp } from "../../context/AppContext";
import NotificationCard from "../../components/common/NotificationCard";
import EmptyState from "../../components/common/EmptyState";

const NotificationPage = () => {
  const { getUserNotifications, markNotificationRead } = useApp();
  const notifications = getUserNotifications();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>

      {notifications.length === 0 ? (
        <EmptyState message="No notifications yet" />
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkRead={markNotificationRead}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
