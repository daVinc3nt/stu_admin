import { UserContext } from "@/Context/InfoContext/UserContext";
import StaffMenu from "@/components/Staff/StaffMenu";
import type { NextPage } from "next";
import { useContext } from "react";
const ValidRole_partnerStaffMenu = 
[
"ADMIN", "HUMAN_RESOURCE_MANAGER", "TELLER", "COMPLAINTS_SOLVER"
, "AGENCY_HUMAN_RESOURCE_MANAGER", "AGENCY_MANAGER", "MANAGER"
, "AGENCY_TELLER", "AGENCY_COMPLAINTS_SOLVER"
]

const ValidRole_StaffMenu = 
[
"ADMIN", "HUMAN_RESOURCE_MANAGER", "TELLER", "COMPLAINTS_SOLVER"
, "AGENCY_HUMAN_RESOURCE_MANAGER", "AGENCY_MANAGER", "MANAGER"
, "AGENCY_TELLER", "AGENCY_COMPLAINTS_SOLVER"
]
const staff: NextPage = () => {
  const {info} = useContext(UserContext)
  if (!info) return
  return (
    <>
        <StaffMenu /> 
    </>
  );
};

export default staff;
