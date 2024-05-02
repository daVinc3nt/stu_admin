import { useState } from "react";
import Side from "./Side";
import {
  ReceiptLong,
  Inventory,
  Assistant,
  People,
  PieChart,
  PendingActions,
  LocalShipping,
  BusinessCenter,
  AlternateEmail,
  Folder,
  MapsHomeWork,
  LogoutOutlined,
  Handshake,
  AccountBox,
  BusinessCenterOutlined,
  AddTask,
} from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import MenuHambuger from "./MenuHambuger";
const SideItemData = [
  {
    id: 1,
    title: <FormattedMessage id="Sidebar.option1" />,
    url: "/dashboard/student",
    icon: <ReceiptLong className="scale-75 lg:block" />,
  },
  {
    id: 2,
    title: <FormattedMessage id="Sidebar.option2" />,
    url: "/dashboard/teacher",
    icon: <Inventory className="scale-75 lg:block" />,
  },
  {
    id: 3,
    title: <FormattedMessage id="Sidebar.option3" />,
    url: "/dashboard/course",
    icon: <Assistant className="scale-75 lg:block" />,
  },
];
export default function SideBar({ toggleCollapse }) {
  const [dropdown, Setdropdown] = useState(false);
  return (
    <Side
      menuItems={SideItemData}
      toggleCollapse={toggleCollapse}
    />
  );
}
