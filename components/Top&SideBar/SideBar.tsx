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
    id: 0,
    title:  <FormattedMessage id="Sidebar.option13" />,
    url: "/dashboard/account",
    icon: <AccountBox className="scale-75 lg:block" />,
  },
  {
    id: 1,
    title: <FormattedMessage id="Sidebar.option1" />,
    url: "/dashboard/order",
    icon: <ReceiptLong className="scale-75 lg:block" />,
  },
  {
    id: 2,
    title: <FormattedMessage id="Sidebar.option2" />,
    url: "/dashboard/consignment",
    icon: <Inventory className="scale-75 lg:block" />,
  },
  {
    id: 3,
    title: <FormattedMessage id="Sidebar.option3" />,
    icon: <Assistant className="scale-75 lg:block" />,
    submenus: [
      {
        id: 4,
        title: <FormattedMessage id="Sidebar.option4" />,
        url: "/dashboard/staff",
        icon: <People className="scale-75 lg:block" />,
      },
      {
        id: 5,
        title: <FormattedMessage id="Sidebar.option6" />,
        url: "/dashboard/schedule",
        icon: <PendingActions className="scale-75 lg:block" />,
      },
      {
        id: 6,
        title: <FormattedMessage id="Sidebar.option7" />,
        url: "/dashboard/vehicle",
        icon: <LocalShipping className="scale-75 lg:block" />,
      },
      {
        id: 10,
        title: <FormattedMessage id="Sidebar.option12" />,
        url: "/dashboard/postoffice",
        icon: <MapsHomeWork className="scale-75 lg:block" />,
      },
      {
        id: 11,
        title: "Đối tác vận tải",
        url: "/dashboard/partner",
        icon: <Handshake className="scale-75 lg:block" />,
      },
      {
        id: 12,
        title: "Doanh nghiệp",
        url: "/dashboard/business",
        icon: <BusinessCenter className="scale-75 lg:block" />,
      },
    ],
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
