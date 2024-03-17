import { Dashboard, Group, ManageAccounts, Message } from "@mui/icons-material";

export const adminTabs = [{
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <Dashboard />,
},
{
    name: "Users",
    path: "/admin/users-management",
    icon: <ManageAccounts />,
},
{
    name: "Chats",
    path: "/admin/chats-management",
    icon: <Group />,
},
{
    name: "Messages",
    path: "/admin/messages",
    icon: <Message />,
},]