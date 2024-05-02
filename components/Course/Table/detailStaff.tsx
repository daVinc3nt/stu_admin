import React, { useRef, useEffect, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { User, Pencil } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { CourseID, CourseOperation, token } from "@/ambLib/amb";
import cookie from "js-cookie";
const KeyCanEdit = [    
  "course_name",
  "credits",
  "course_type",
  "major",
  "faculty",
  "course_condition", // Assuming this can be an array of any type
  "student_condition"
]

interface DetailStaffProps {
  onClose: () => void;
  dataInitial: any;
  reload: any;
}

const DetailStaff: React.FC<DetailStaffProps> = ({ onClose, dataInitial, reload }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState(dataInitial);
  const [updateData, setupdateData] = useState<any>({});

  const handleUpdateData =(e, key:string, input:string = "string") => {
    if (input == "number")
      setupdateData({...updateData, [key]: parseInt(e.target.value)});
    else 
      setupdateData({...updateData, [key]: e.target.value});
  }

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
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = async () => {
    // Gửi API về server để cập nhật dữ liệu
    // Sau khi hoàn thành, có thể tắt chế độ chỉnh sửa
    const myToken: token = {
      token: cookie.get("token"),
    };
    const condition: CourseID = {course_id: dataInitial.course_id }
    const course =new CourseOperation()
    setIsEditing(false);
    await course.update(updateData, condition, myToken )
    reload()
  };

  const traverse = (obj, isEditing, canEdit?) => {
  
    const editableElements = [];
    const nonEditableElements = [];
  
    Object.keys(obj).forEach((key) => {
      if (obj[key] && typeof obj[key] === 'object') {
        traverse(obj[key], isEditing);
      } else {
        const formattedKey = `course.${key}`;
        const formattedValue = obj[key] ? obj[key] : <FormattedMessage id={`order.noInfo`} />;
        const element = (
          <div key={key} id="order_id" className="bg-gray-100 p-3 rounded-xl shadow-inner">
            <div className="font-bold text-base ">
              <FormattedMessage id={formattedKey} />
            </div>
            {isEditing && KeyCanEdit.includes(key) ? (
              <input
                className="w-2/3 bg-transparent border-b-2 border-[#545e7b] text-black"
                type="text"
                value={obj[key]}
                onChange={(e) => {
                  setData({ ...obj, [key]: e.target.value });
                  handleUpdateData(e, key);
                }}
              />
            ) : (
              <div className="text-gray-500 w-fit inline-block break-all">{formattedValue}</div>
            )}
          </div>
        );
        if (KeyCanEdit && KeyCanEdit.includes(key)) {
          editableElements.push(element);
        } else {
          nonEditableElements.push(element);
        }
      }
    });
    return (
      <div className="flex flex-col overflow-y-scroll w-fit no-scrollbar">
        <div className="text-xl text-black dark:text-white font-bold uppercase text-center">
          <FormattedMessage id="course.canEdit" />
        </div>
        <div className="grid-cols-2 grid lg:grid-cols-3 p-10 gap-4">
          {editableElements}
        </div>

        <div className="text-xl text-black dark:text-white font-bold uppercase text-center">
          <FormattedMessage id="course.cannotEdit" />
        </div>
        <div className="grid-cols-2 grid lg:grid-cols-3 p-10 gap-4">
          {nonEditableElements}
        </div>
      </div>
    );
  };
  
  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-[#545e7b]`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{
        backdropFilter: "blur(12px)",
      }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-fit bg-white dark:bg-[#14141a] h-fit rounded-xl p-4 overflow-y-auto
          ${isShaking ? "animate-shake" : ""}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-black dark:text-white w-full text-center">
            <FormattedMessage id="course.innfomation" />
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_4/6 overflow-y-scroll border border-[#545e7b]
         mt-4 no-scrollbar flex flex-col bg-gray-100 dark:bg-[#14141a] p-2 rounded-md 
        dark:text-white text-black place-content-center">
              <div className="h-screen_3/5 w- border py-5 mt-4 flex flex-col items-center
               bg-white dark:bg-[#20202a] rounded-md text-black 
               place-content-center">
                {
                    traverse(data, isEditing)
                }
              </div>
        </div>

        <div className="w-full flex">
          {!isEditing ? (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md"
              onClick={handleEditClick}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">
                <FormattedMessage id="Edit" />
              </span>
            </Button>
          ) : (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
    bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
    hover:shadow-md"
              onClick={handleSaveClick}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">
                <FormattedMessage id="Save" />
              </span>
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailStaff;
