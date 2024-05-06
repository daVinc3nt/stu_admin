import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import CustomDropdown from "./dropdown";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import PasswordToggle from "./PasswordToggle";
import { AdministrativeOperation, CreatingStaffByAdminInfo, CreatingStaffByAgencyInfo, StaffsOperation } from "@/TDLib/tdlogistics";
import { CourseOperation, CreatingTeacherInfo, TeacherOperation, token } from "@/ambLib/amb";
import cookie from "js-cookie"
import { useTheme } from "next-themes";
import Select from "react-select"
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

interface Ward {
  Id: string;
  Name: string;
}
const AddStaff: React.FC<AddStaffProps> = ({ onClose, reload }) => {
  const openModal = (type) => {
    setType(type);
    setModalIsOpen(true);
  };
  const [All_course, setAll_course]= useState([]);
  const [SelectedOption1,setSelectedOption1]= useState([]);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleSelect1 = (selectedOption) => {
    setSelectedOption1(selectedOption);
  };
  
  const major = [
    "Kỹ thuật Điện",
    "Kỹ thuật Điện tử - Viễn thông",
    "Kỹ thuật Điều khiển và Tự động hóa",
    "Kỹ thuật Y sinh",
    "Công nghệ Nano",
    "Kỹ thuật Cơ khí",
    "Kỹ thuật Ô tô",
    "Kỹ thuật Hàng không",
    "Kỹ thuật Đóng tàu",
    "Kỹ thuật Năng lượng",
    "Khoa học Máy tính",
    "Kỹ thuật Phần mềm",
    "Kỹ thuật Hệ thống Máy tính",
    "Kỹ thuật Mạng Máy tính",
    "Trí tuệ nhân tạo",
    "Kỹ thuật Hóa học",
    "Công nghệ Hóa học",
    "Khoa học Vật liệu",
    "Kỹ thuật Hóa sinh",
    "Kỹ thuật Môi trường",
    "Kỹ thuật Xây dựng",
    "Kỹ thuật Cầu đường",
    "Kỹ thuật Giao thông vận tải",
    "Kỹ thuật Thủy lợi",
    "Quy hoạch Đô thị và Kỹ thuật Hạ tầng",
    "Vật lý",
    "Kỹ thuật Vật lý",
    "Khoa học Vật liệu",
    "Nano",
    "Năng lượng Mặt trời",
    "Kỹ thuật Dầu khí",
    "Kỹ thuật Địa chất",
    "Kỹ thuật Xử lý Khí",
    "Kỹ thuật An toàn Mỏ",
    "Kinh tế Dầu khí",
    "Kỹ thuật Dệt may",
    "Thiết kế Thời trang",
    "Công nghệ Dệt",
    "Kỹ thuật May",
    "Quản lý Chất lượng Dệt may",
    "Kỹ thuật Y sinh",
    "Kỹ thuật Y sinh Điện tử",
    "Kỹ thuật Y sinh Vật liệu",
    "Kỹ thuật Y sinh Cơ học",
    "Kỹ thuật Hình ảnh Y tế",
    "Quản lý Công nghiệp",
    "Quản trị Kinh doanh",
    "Kỹ thuật Hệ thống Công nghiệp",
    "Kỹ thuật Logistics và Quản lý Chuỗi cung ứng",
    "Kỹ thuật Tài chính",
    "Tiếng Anh",
    "Tiếng Pháp",
    "Tiếng Nhật",
    "Tiếng Hàn",
    "Tiếng Trung",
    "Giáo dục Thể chất",
    "Huấn luyện Thể thao",
    "Y học Thể thao",
    "Quản lý Thể dục Thể thao",
    "Quản trị Kinh doanh",
    "Kế toán",
    "Tài chính - Ngân hàng",
    "Kinh tế Quốc tế",
    "Marketing",
    "Xã hội học",
    "Tâm lý học",
    "Ngôn ngữ học",
    "Văn học",
    "Lịch sử",
  ];
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [type, setType] = useState();
  const intl = useIntl();
  const { systemTheme, theme, setTheme } = useTheme();
  const initialData = {
    fullname: "",
    gender: "",
    date_of_birth: "", // Assuming date is in string format (you can use a specific date type if needed)
    credential_id: "",
    contact_email: "",
    phone_number: "",
    address: "",
    home_class: "",
    degree: "",
    faculty: "", // Assuming this is supposed to be "faculty"
    major: "",
    subject: []
  }
  const [teacherdata, setteacherdata] = useState<CreatingTeacherInfo>(initialData);
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
    console.log(teacherdata.subject)
    setteacherdata((prevState) => ({
      ...prevState,
      [key]: value,
    }));
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
  const [error, setError] = useState("");
  // const handleConfirm = async () => {
  //   const Order = new OrdersOperation();
  //   const condition: UploadingOrderFileCondition = {
  //     file: selectedFile,
  //   };
  //   console.log(condition);
  //   try {
  //     const checkfile = await Order.checkFileFormat(condition);
  //     console.log(checkfile);
  //     if (checkfile.error.error) {
  //       alert(checkfile.error.message);
  //       setSelectedFile(null);
  //       return;
  //     }
  //     if (checkfile.valid === false) {
  //       alert(checkfile.message);
  //       setSelectedFile(null);
  //       return;
  //     }
  //     const response = await Order.createByFile(condition);
  //     console.log(response);
  //     alert(response.message);
  //     setSelectedFile(null);
  //     reload();
  //   } catch (e) {
  //     console.log(e);
  //     alert("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau!");
  //   }
  // };

  const handleSubmit = async () => {
    const myToken: token = {
      token: cookie.get("token"),
    };
    const teacher =new TeacherOperation()
    console.log(teacherdata)
    const response= await teacher.create(teacherdata, myToken)
    console.log(response.error.error)
    if (response.error && response.error?.error)
      {
        alert(response.error.message);
        return;
      }
    alert(response.message);
    setteacherdata(initialData)  
    reload();
  };
  useEffect(() => {
    const fetchData = async () => {
      const myToken: token = {
        token: cookie.get("token"),
      };
      const course =new CourseOperation()
      const res = await course.findAllCourses({},myToken)
      setAll_course(res.data?.map((ele) => ({
        value: ele.course_id,
        label: ele.course_name,
      })));
    }
    fetchData();
  })

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
            <FormattedMessage id="teacher.AddButton" />
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        <div>
          <div className="h-screen_3/4 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-white  dark:bg-[#14141a] p-2 rounded-md text-black dark:text-white">
            <div className="w-full h-fit">
              <h1 className="font-semibold pb-2 text-center">
                <FormattedMessage id="teacher.Title" />
              </h1>
              <div className="flex flex-col gap-3">
                <input
                  type="string"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.fullname ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({
                    id: "teacher.fullname",
                  })}
                  value={teacherdata.fullname}
                  onChange={(e) => handleInputChange("fullname", e.target.value)}
                />

                <input
                  type="string"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.phone_number ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({
                    id: "teacher.phone_number",
                  })}
                  value={teacherdata.phone_number}
                  onChange={(e) => handleInputChange("phone_number", e.target.value)}
                />
              </div>

              <div className="flex gap-3 mt-3">
                <input 
                  type="date"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.date_of_birth ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({
                    id: "teacher.date_of_birth",
                  })}
                  value={teacherdata.date_of_birth}
                  onChange={(e) =>
                    handleInputChange("date_of_birth", e.target.value)
                  }
                />
                <input
                  type="text"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.cccd ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({
                    id: "teacher.credential_id",
                  })}
                  value={teacherdata.credential_id}
                  onChange={(e) => handleInputChange("credential_id", e.target.value)}
                />
                <input
                  type="text"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.email ? "border-red-500" : ""}`}
                  placeholder="Email"
                  value={teacherdata.contact_email}
                  onChange={(e) => handleInputChange("contact_email", e.target.value)}
                />
                
              </div>
              <div className="flex gap-3 mt-3">
                <input
                  type="text"
                  className={`text-xs md:text-sm border border-gray-600 rounded bg-white  dark:bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.cccd ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({
                    id: "teacher.homeroom_class",
                  })}
                  value={teacherdata.home_class}
                  onChange={(e) => handleInputChange("home_class", e.target.value)}
                />
                <input
                  type="text"
                  className={`text-xs md:text-sm border border-gray-600 rounded bg-white  dark:bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.detail_address ? "border-red-500" : ""}`}
                  placeholder={intl.formatMessage({
                    id: "teacher.address",
                  })}
                  value={teacherdata.address}
                  onChange={(e) =>
                    handleInputChange("address", e.target.value)
                  }
                />
              </div>             
              <div className="flex gap-3 mt-3">
                <div
                  className={`text-xs text-center md:text-sm border border-gray-600 rounded  bg-white  dark:bg-[#14141a] h-10 p-2 w-fit
                  ${checkmissing.role ? "border-red-500" : ""}`}
                >
                  <CustomDropdown
                    label={intl.formatMessage({ id: "teacher.gender" })}
                    options={["Nam", "Nữ"]}
                    selectedOption={teacherdata.gender}
                    onSelectOption={(option) => handleInputChange("gender", option)}
                  />
                </div>
                {/* <div
                  className={`text-xs text-center md:text-sm border border-gray-600 rounded bg-white  dark:bg-[#14141a] h-10 p-2 w-fit
                  ${checkmissing.role ? "border-red-500" : ""}`}
                >
                  <CustomDropdown
                    label={intl.formatMessage({ id: "teacher.program" })}
                    options={program}
                    selectedOption={teacherdata.subject}
                    onSelectOption={(option) => handleInputChange("program", option)}
                  />
                </div> */}
                <div
                  className={`text-xs text-center md:text-sm border border-gray-600 rounded bg-white  dark:bg-[#14141a] h-10 p-2 w-fit
                  ${checkmissing.role ? "border-red-500" : ""}`}
                >
                  <CustomDropdown
                    label={intl.formatMessage({ id: "teacher.faculty" })}
                    options={faculty}
                    selectedOption={teacherdata.faculty}
                    onSelectOption={(option) => handleInputChange("faculty", option)}
                  />
                </div>
                <div
                  className={`text-xs text-center md:text-sm border border-gray-600 rounded bg-white  dark:bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.role ? "border-red-500" : ""}`}
                >
                  <CustomDropdown
                    label={intl.formatMessage({ id: "teacher.degree" })}
                    options={["Cử nhân", "Thạc sĩ", "Tiến sĩ"]}
                    selectedOption={teacherdata.degree}
                    onSelectOption={(option) => handleInputChange("degree", option)}
                  />
                </div>               
              </div>
                <div
                  className={`text-xs mt-3 text-center md:text-sm border border-gray-600 rounded bg-white  dark:bg-[#14141a] h-10 p-2 w-full
                  ${checkmissing.role ? "border-red-500" : ""}`}
                >
                  <CustomDropdown
                    label={intl.formatMessage({ id: "teacher.major" })}
                    options={major}
                    selectedOption={teacherdata.major}
                    onSelectOption={(option) => handleInputChange("major", option)}
                  />
                </div>
                <div className="flex gap-3 mt-3">
                  <Select
                    id="Class_condition"
                    placeholder={intl.formatMessage({
                      id: "Class.course_id",
                    })}
                    value={(SelectedOption1 as any).label}
                    onChange={(option) =>{ 
                      handleSelect1(option)
                      console.log((option as any).value)
                      handleInputChange("subject", option.map(ele => ele.value))
                    }}
                    aria-label=".form-select-sm"
                    isSearchable
                    options={All_course}
                    isMulti={true}
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
            </div>
          </div>
          <Button
            className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
          bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
            onClick={handleSubmit}
          >
            <span className="hidden xs:block">
              <FormattedMessage id="teacher.add1" />
            </span>
          </Button>
        </div>
        <div className=" flex place-content-center text-red-500 font-bold ">
          {error && <p>{error}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddStaff;
