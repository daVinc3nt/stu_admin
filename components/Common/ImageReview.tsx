import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { FormattedMessage, useIntl } from "react-intl";
import { ShippersOperation } from "@/TDLib/tdlogistics";
import Image from 'next/image'

interface ImageViewProps {
    onClose: () => void;
    url: string;
}

const ImageView: React.FC<ImageViewProps> = ({ onClose, url }) => {
    const notificationRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const intl = useIntl()

    return (
        <motion.div
            className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-10 z-50 p-4 sm:p-8 lg:p-14`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                backdropFilter: "blur(6px)",
            }}
        >
            <motion.div
                ref={notificationRef}
                className={`relative w-full h-full bg-white dark:bg-[#1a1b23] rounded-xl p-2 flex flex-col`}
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Button
                    className="absolute dark:text-black right-4 top-4 sm:-right-3 w-8 h-8 sm:-top-3 rounded-full mb-2 z-30 bg-white shadow"
                    onClick={() => onClose()}
                >
                    <IoMdClose className="w-5/6 h-5/6" />
                </Button>
                <div className="w-full h-full relative flex flex-col dark:bg-[#31323cb9] bg-gray-200 px-2 py-2 rounded-sm gap-1">
                    <Image
                        src={url}
                        alt={`Image full`}
                        width={100}
                        height={100}
                        className='h-full w-full rounded-md object-contain'
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ImageView;