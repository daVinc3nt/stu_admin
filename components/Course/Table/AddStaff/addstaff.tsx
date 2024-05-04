import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import CustomDropdown from "./dropdown";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import PasswordToggle from "./PasswordToggle";
import { AdministrativeOperation, CreatingStaffByAdminInfo, CreatingStaffByAgencyInfo, StaffsOperation } from "@/TDLib/tdlogistics";
import { CreatingCourseInfo, CourseOperation, token } from "@/ambLib/amb";
import cookie from "js-cookie"
import Select from "react-select"
import { TabSlider } from "@/components/Common/TabSlider";
import MultiValue from "react-select/dist/declarations/src/components/MultiValue";
import { useTheme } from "next-themes";
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
const AddStaff: React.FC<AddStaffProps> = ({ onClose, reload }) => {
  const openModal = (type) => {
    setType(type);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const major =[
    { value: "Kỹ thuật Điện", label: "Kỹ thuật Điện" },
    { value: "Kỹ thuật Điện tử - Viễn thông", label: "Kỹ thuật Điện tử - Viễn thông" },
    { value: "Kỹ thuật Điều khiển và Tự động hóa", label: "Kỹ thuật Điều khiển và Tự động hóa" },
    { value: "Kỹ thuật Y sinh", label: "Kỹ thuật Y sinh" },
    { value: "Công nghệ Nano", label: "Công nghệ Nano" },
    { value: "Kỹ thuật Cơ khí", label: "Kỹ thuật Cơ khí" },
    { value: "Kỹ thuật Ô tô", label: "Kỹ thuật Ô tô" },
    { value: "Kỹ thuật Hàng không", label: "Kỹ thuật Hàng không" },
    { value: "Kỹ thuật Đóng tàu", label: "Kỹ thuật Đóng tàu" },
    { value: "Kỹ thuật Năng lượng", label: "Kỹ thuật Năng lượng" },
    { value: "Khoa học Máy tính", label: "Khoa học Máy tính" },
    { value: "Kỹ thuật Phần mềm", label: "Kỹ thuật Phần mềm" },
    { value: "Kỹ thuật Hệ thống Máy tính", label: "Kỹ thuật Hệ thống Máy tính" },
    { value: "Kỹ thuật Mạng Máy tính", label: "Kỹ thuật Mạng Máy tính" },
    { value: "Trí tuệ nhân tạo", label: "Trí tuệ nhân tạo" },
    { value: "Kỹ thuật Hóa học", label: "Kỹ thuật Hóa học" },
    { value: "Công nghệ Hóa học", label: "Công nghệ Hóa học" },
    { value: "Khoa học Vật liệu", label: "Khoa học Vật liệu" },
    { value: "Kỹ thuật Hóa sinh", label: "Kỹ thuật Hóa sinh" },
    { value: "Kỹ thuật Môi trường", label: "Kỹ thuật Môi trường" },
    { value: "Kỹ thuật Xây dựng", label: "Kỹ thuật Xây dựng" },
    { value: "Kỹ thuật Cầu đường", label: "Kỹ thuật Cầu đường" },
    { value: "Kỹ thuật Giao thông vận tải", label: "Kỹ thuật Giao thông vận tải" },
    { value: "Kỹ thuật Thủy lợi", label: "Kỹ thuật Thủy lợi" },
    { value: "Quy hoạch Đô thị và Kỹ thuật Hạ tầng", label: "Quy hoạch Đô thị và Kỹ thuật Hạ tầng" },
    { value: "Vật lý", label: "Vật lý" },
    { value: "Kỹ thuật Vật lý", label: "Kỹ thuật Vật lý" },
    { value: "Khoa học Vật liệu", label: "Khoa học Vật liệu" },
    { value: "Nano", label: "Nano" },
    { value: "Năng lượng Mặt trời", label: "Năng lượng Mặt trời" },
    { value: "Kỹ thuật Dầu khí", label: "Kỹ thuật Dầu khí" },
    { value: "Kỹ thuật Địa chất", label: "Kỹ thuật Địa chất" },
    { value: "Kỹ thuật Xử lý Khí", label: "Kỹ thuật Xử lý Khí" },
    { value: "Kỹ thuật An toàn Mỏ", label: "Kỹ thuật An toàn Mỏ" },
    { value: "Kinh tế Dầu khí", label: "Kinh tế Dầu khí" },
    { value: "Kỹ thuật Dệt may", label: "Kỹ thuật Dệt may" },
    { value: "Thiết kế Thời trang", label: "Thiết kế Thời trang" },
    { value: "Công nghệ Dệt", label: "Công nghệ Dệt" },
    { value: "Kỹ thuật May", label: "Kỹ thuật May" }
  ] ;
  const program = ["CQ", "CLC", "VHVL"]
  const faculty = [
    "ME",
    "EE",
    "EEE",
    "IT",
    "CHE",
    "MSE",
    "CE",
    "ENVE",
    "PE",
    "FT",
    "BME",
    "NE",
    "MCIT",
    "CSE",
    "TRE",
    "AE",
    "FL"
  ];
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [SelectedOption,setSelectedOption]= useState([{value: "", label: "chọn ngành"}]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [type, setType] = useState();
  const intl = useIntl();
  const { systemTheme, theme, setTheme } = useTheme();
  const course_type = [
    "Đại cương",
    "GDTC",
    "GDQP",
    "Ngoại ngữ",
    "Nhập môn",
    "Quản lý",
    "Cơ sở",
    "Chuyên ngành"
  ];
  const initialData = {
    course_name: "",
    credits: 0,
    course_type: "",
    major: [],
    faculty: "",
    course_condition: [], // Assuming this can be an array of any type
    student_condition: 0
  }
  const [coursedata, setcoursedata] = useState<CreatingCourseInfo>(initialData);
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
    setcoursedata((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  useEffect(() =>
    console.log(SelectedOption),[SelectedOption])
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
    const course =new CourseOperation()
    console.log(coursedata)
    const response= await course.create(coursedata, myToken)
    console.log(response.error.error)
    if (response.error && response.error?.error)
      {
        alert(response.error.message);
        return;
      }
    alert(response.message);
    setcoursedata(initialData)  
    reload();
  };

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
        className={`relative w-[98%] sm:w-9/12 lg:w-1/2 bg-white dark:bg-[#14141a] rounded-xl p-4 overflow-y-auto ${
          isShaking ? "animate-shake" : ""
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">
            <FormattedMessage id="Staff.AddButton" />
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        <div>
          <div className="h-full w-full overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-white  dark:bg-[#14141a] p-2 rounded-md text-black dark:text-white">
            <div className="w-full h-fit p-4 flex flex-col gap-2 items-center justify-center">
              <TabSlider
              allTabs={[
                {
                  id: "1",
                  name: <FormattedMessage id="course.add1" />,
                  status: "",
                },
                {
                  id: "2",
                  name: <FormattedMessage id="course.class" />,
                  status: 2,
                },
              ]}
              onSelectOption={(value) => {
                ;
              }}
              />
              <div>
                <div className="flex flex-col gap-3">
                <input
                    type="text"
                    className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                    ${checkmissing.fullname ? "border-red-500" : ""}`}
                    placeholder={intl.formatMessage({
                      id: "course.course_name",
                    })}
                    value={coursedata.course_name}
                    onChange={(e) => handleInputChange("course_name", e.target.value)}
                  />
                  <input
                    type="number"
                    className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                    ${checkmissing.fullname ? "border-red-500" : ""}`}
                    placeholder={intl.formatMessage({
                      id: "course.credits",
                    })}
                    value={coursedata.credits ?coursedata.credits:"" }
                    onChange={(e) => {handleInputChange("credits", e.target.value)}}
                  />
                  <Select
                      id="major"
                      placeholder={intl.formatMessage({
                        id: "course.major",
                      })}
                      value={SelectedOption.label}
                      onChange={(option) =>{ 
                        handleSelect
                      }}
                      aria-label=".form-select-sm"
                      isSearchable
                      options={major}
                      className={`text-xs fixed z-50 md:text-sm text-black border border-gray-600 rounded-md focus:outline-none w-full  text-center `}
                      isMulti={true}
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
                <div className="flex gap-3 mt-3">
                  <div
                    className={`text-xs text-center md:text-sm border border-gray-600 rounded  bg-white  dark:bg-[#14141a] h-10 p-2 w-fit
                    ${checkmissing.role ? "border-red-500" : ""}`}
                  >
                    <CustomDropdown
                      label={intl.formatMessage({ id: "course.course_type" })}
                      options={course_type}
                      selectedOption={coursedata.course_type}
                      onSelectOption={(option) => handleInputChange("course_type", option)}
                    />
                  </div>
                  <div
                    className={`text-xs text-center md:text-sm border border-gray-600 rounded bg-white  dark:bg-[#14141a] h-10 p-2 w-fit
                    ${checkmissing.role ? "border-red-500" : ""}`}
                  >
                    <CustomDropdown
                      label={intl.formatMessage({ id: "course.faculty" })}
                      options={faculty}
                      selectedOption={coursedata.faculty}
                      onSelectOption={(option) => handleInputChange("faculty", option)}
                    />
                  </div>
                  <div
                    className={`text-xs text-center md:text-sm border border-gray-600 rounded bg-white  dark:bg-[#14141a] h-10 p-2 w-full
                    ${checkmissing.role ? "border-red-500" : ""}`}
                  >
                    <CustomDropdown
                      label={intl.formatMessage({ id: "course.student_condition" })}
                      options={[1, 2, 3, 4]}
                      selectedOption={coursedata.student_condition}
                      onSelectOption={(option) => handleInputChange("student_condition", option)}
                    />
                  </div>               
                </div>
              </div>
              
            </div>
          </div>
          <Button
            className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
          bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
            onClick={handleSubmit}
          >
            <span className="hidden xs:block">
              <FormattedMessage id="Staff.AddButton" />
            </span>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddStaff;
