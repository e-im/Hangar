package io.papermc.hangar.service.internal.users.notifications;

import io.papermc.hangar.db.dao.internal.table.NotificationsDAO;
import io.papermc.hangar.model.Named;
import io.papermc.hangar.model.common.roles.Role;
import io.papermc.hangar.model.db.NotificationTable;
import io.papermc.hangar.model.db.OrganizationTable;
import io.papermc.hangar.model.db.Table;
import io.papermc.hangar.model.db.projects.ProjectTable;
import io.papermc.hangar.model.db.roles.ExtendedRoleTable;
import io.papermc.hangar.model.db.roles.OrganizationRoleTable;
import io.papermc.hangar.model.db.roles.ProjectRoleTable;
import io.papermc.hangar.model.internal.user.notifications.NotificationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;

public abstract class JoinableNotificationService<RT extends ExtendedRoleTable<? extends Role<RT>, ?>, J extends Table & Named> {

    @Autowired
    private NotificationsDAO notificationsDAO;

    protected final String msgPrefix;

    protected JoinableNotificationService(String msgPrefix) {
        this.msgPrefix = msgPrefix;
    }

    public void invited(Collection<RT> inviteeRoleTables, J joinable) {
        Collection<NotificationTable> notificationTables = new HashSet<>();
        for (RT rt : inviteeRoleTables) {
            notificationTables.add(new NotificationTable(rt.getUserId(), "notifications", joinable.getId(), new String[]{this.msgPrefix + "invite", rt.getRole().getTitle(), joinable.getName()}, NotificationType.INFO));
        }
        notificationsDAO.insert(notificationTables);
    }

    public void removedFrom(RT removedFromRoleTable, J joinable) {
        String msgKey = this.msgPrefix + (removedFromRoleTable.isAccepted() ? "removed" : "inviteRescinded");
        notificationsDAO.insert(new NotificationTable(removedFromRoleTable.getUserId(), null, joinable.getId(),
            new String[]{msgKey, removedFromRoleTable.getRole().getTitle(), joinable.getName()}, NotificationType.WARNING));
    }

    public void roleChanged(RT changedRoleTable, J joinable) {
        notificationsDAO.insert(new NotificationTable(changedRoleTable.getUserId(), null, joinable.getId(),
            new String[]{this.msgPrefix + "roleChanged", changedRoleTable.getRole().getTitle(), joinable.getName()}, NotificationType.INFO));
    }


    @Service
    public static class ProjectNotificationService extends JoinableNotificationService<ProjectRoleTable, ProjectTable> {

        public ProjectNotificationService() {
            super("notifications.project.");
        }

    }

    @Service
    public static class OrganizationNotificationService extends JoinableNotificationService<OrganizationRoleTable, OrganizationTable> {

        public OrganizationNotificationService() {
            super("notifications.organization.");
        }

    }
}
