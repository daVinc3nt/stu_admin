import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import CustomDropdown from "./dropdown";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import PasswordToggle from "./PasswordToggle";
import { AdministrativeOperation, CreatingStaffByAdminInfo, CreatingStaffByAgencyInfo, StaffsOperation } from "@/TDLib/tdlogistics";
import { CreateClassInfo, ClassOperation, token, CourseOperation } from "@/ambLib/amb";
import cookie from "js-cookie"
import Select from "react-select"
import { TabSlider } from "@/components/Common/TabSlider";
import MultiValue from "react-select/dist/declarations/src/components/MultiValue";
import { useTheme } from "next-themes";
import { parse } from "node:path/posix";
interface AddStaffProps {
  onClose: () => void;
  reload: any;
}

interface City {
  Id: string;
  Name: string;
  Districts: District[];
}

interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}
interface MajorOption {
  value: string;
  label: string;
}

interface Ward {
  Id: string;
  Name: string;
}
const AddStaff1: React.FC<AddStaffProps> = ({ onClose, reload }) => {

  const program = ["CQ", "CLC", "CN"]
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [SelectedOption1,setSelectedOption1]= useState([]);
  const [SelectedOption2,setSelectedOption2]= useState([]);
  const [All_course, setAll_course]= useState([]);
  const [weeks, setWeeks] = useState('');
  const [weeksData, setWeeksData] = useState([]);
  const [periods, setPeriods] = useState('');
  const [periodsData, setPeriodsData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [type, setType] = useState();
  const intl = useIntl();
  const { systemTheme, theme, setTheme } = useTheme();
  const initialData = {
    course_id: "",
    program: "",
    semester: "",
    day: "",
    max_students: 0,
    period: [],
    room: "",
    weeks:[],
  }
  const Class =new ClassOperation()
  const course =new CourseOperation()
  const [Classdata, setClassdata] = useState<CreateClassInfo>(initialData);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setClassdata((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSelect1 = (selectedOption) => {
    setSelectedOption1(selectedOption);
  };
  const handleSelect2 = (selectedOption) => {
    setSelectedOption2((selectedOption as any).label);
  };

  // A function to handle the password input change

  // A function to handle the confirm password input change
  const [checkmissing, setCheckmissing] = useState({
    agency_id: false,
    fullname: false,
    username: false,
    password: false,
    date_of_birth: false,
    cccd: false,
    phone_number: false,
    email: false,
    role: false,
    position: false,
    salary: false,
    province: false,
    district: false,
    town: false,
    detail_address: false,
    paid_salary: false
  });
  const handleCheckMissing = (key: string, value: boolean) => {
    setCheckmissing((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };


  const handleSubmit = async () => {
    const myToken: token = {
      token: cookie.get("token"),
    };
    console.log({
      ...Classdata, 
      period: periods.trim().split(',').map((num) => parseInt(num)),  
      weeks: weeks.trim().split(',').map((num) => parseInt(num))
    })
    const response= await Class.create(
      {
        ...Classdata, 
        period: periods.trim().split(',').map((num) => parseInt(num)),  
        weeks: weeks.trim().split(',').map((num) => parseInt(num))
      }
      , myToken)
      
    console.log(response.error.error)
    if (response.error && response.error?.error)
      {
        alert(response.error.message);
        return;
      }
    alert(response.message);
    setClassdata(initialData)  
    reload();
  };
  useEffect(() => {
    const fetchData = async () => {
      const myToken: token = {
        token: cookie.get("token"),
      };
      const res = await course.findAllCourses({},myToken)
      setAll_course(res.data?.map((ele) => ({
        value: ele.course_id,
        label: ele.course_name,
      })));
    }
    fetchData();
    
  }, []);
  return (
    
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 `}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{ backdropFilter: "blur(12px)" }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12  h-screen_4/5 lg:w-1/2 bg-white dark:bg-[#14141a] rounded-xl p-4 overflow-y-hidden ${
          isShaking ? "animate-shake" : ""
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center  justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">
            <FormattedMessage id="Class.AddButton" />
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        <div className="w-full h-4/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-white  dark:bg-[#14141a] p-2 rounded-md text-black dark:text-white">
          <div className="w-full p-4 flex flex-col gap-2 items-center justify-center">
              <div className="flex w-full flex-col gap-3">
                <div className="flex gap-5">
                    <input
                      type="text"
                      className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                      ${checkmissing.fullname ? "border-red-500" : ""}`}
                      placeholder={intl.formatMessage({
                        id: "Class.room",
                      })}
                      value={Classdata.room}
                      onChange={(e) => handleInputChange("room", e.target.value)}
                    />
                    <input
                      type="text"
                      className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                      ${checkmissing.fullname ? "border-red-500" : ""}`}
                      placeholder={intl.formatMessage({
                        id: "Class.semester",
                      })}
                      value={Classdata.semester}
                      onChange={(e) => handleInputChange("semester", e.target.value)}
                    />
                    <input
                      type="number"
                      className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                      ${checkmissing.fullname ? "border-red-500" : ""}`}
                      placeholder={intl.formatMessage({
                        id: "Class.max_students",
                      })}
                      value={Classdata.max_students ?Classdata.max_students:"" }
                      onChange={(e) => {handleInputChange("max_students", parseInt(e.target.value))}}
                    />
                </div>
                <Select
                  id="Class_condition"
                  placeholder={intl.formatMessage({
                    id: "Class.course_id",
                  })}
                  value={(SelectedOption2 as any).label}
                  onChange={(option) =>{ 
                    handleSelect2(option)
                    handleInputChange("course_id", (option as any).value)
                  }}
                  aria-label=".form-select-sm"
                  isSearchable
                  options={All_course}
                  className={`text-xs z-40 md:text-sm text-black border border-gray-600 rounded-md focus:outline-none w-full  text-center `}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: state.isFocused
                        ? "none"
                        : provided.boxShadow,
                      "&:hover": {
                        border: "none",
                      },
                      color: "#4a5568",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: theme == "dark" ? "#a0aec0" : "#a0aec0",
                      fontSize: "0.875rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: theme == "dark" ? "#a0aec0" : "#a0aec0",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }),
                    clearIndicator: (provided) => ({
                      ...provided,
                      color: theme === "dark" ? "#D1D5DB" : "#374151",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      color: theme === "dark" ? "#D1D5DB" : "#374151",
                      marginTop: "2px",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor:
                        theme === "dark" ? "#0B1437" : "#FFFFFF",
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      color: theme === "dark" ? "#ffffff" : "#374151",
                      marginTop: "2px",
                    }),
                    option: (
                      styles,
                      { data, isDisabled, isFocused, isSelected }
                    ) => {
                      return {
                        ...styles,
                        backgroundColor: isFocused
                          ? theme === "dark"
                            ? "#707EAE"
                            : "#d1d5db"
                          : "transparent",
                      };
                    },
                    container: (provided, state) => ({
                      ...provided,
                      color: "#4a5568",
                    }),
                  }}
                />
              </div>          
              <div className="flex w-full gap-3 mt-3">
                <div
                  className={`text-xs text-center md:text-sm border border-gray-600 rounded  bg-white  dark:bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.role ? "border-red-500" : ""}`}
                >
                  <CustomDropdown
                    label={intl.formatMessage({ id: "Class.program" })}
                    options={program}
                    selectedOption={Classdata.program}
                    onSelectOption={(option) => handleInputChange("program", option)}
                  />
                </div>
                
                <div
                  className={`text-xs text-center md:text-sm border border-gray-600 rounded bg-white  dark:bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.role ? "border-red-500" : ""}`}
                >
                  <CustomDropdown
                    label={intl.formatMessage({ id: "Class.day" })}
                    options={["Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6", "Thứ 7","Chủ nhật"]}
                    selectedOption={Classdata.day}
                    onSelectOption={(option) => handleInputChange("day", option)}
                  />
                </div>               
              
              </div>
              
              <div className="flex  w-full mt-3 gap-5">
                    <input
                      type="text"
                      className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                      ${checkmissing.fullname ? "border-red-500" : ""}`}
                      placeholder={intl.formatMessage({
                        id: "Class.weeks",
                      })}
                      value={weeks}
                      onChange={(e) => {
                        
                        setWeeks(e.target.value)
                        // const newData= e.target.value.trim().split(',').map((num) => parseInt(num));
                        // setWeeksData(newData);
                      }}
                    />

                    <input
                      type="text"
                      className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                      ${checkmissing.fullname ? "border-red-500" : ""}`}
                      placeholder={intl.formatMessage({
                        id: "Class.periods",
                      })}
                      value={periods}
                      onChange={(e) => {
                        if(periods.length > 3)
                        setPeriods(e.target.value)
                        // const newData= e.target.value.trim().split(',').map((num) => parseInt(num));
                        // setPeriodsData(newData);
                      }}
                    />                    
              </div>
        
          </div>

          
        </div>
        <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
                  bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
              onClick={handleSubmit}
            >
              <span className="hidden xs:block">
                <FormattedMessage id="Class.AddButton" />
              </span>
            </Button>
      </motion.div>
    </motion.div>
  );
};

export default AddStaff1;
