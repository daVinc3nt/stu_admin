"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { LogoIcon, UsersIcon } from "@/components/Icons";
import DetailStaff from "./detailStaff";
import { Checkbox } from "@/components/TableUI/checkbox";
import { FormattedMessage } from "react-intl";
// Đảm bảo gọi hàm này ở đầu ứng dụng của bạn\

export type course = {
  active: boolean;
  agency_id: string;
  avatar: string;
  bank: string;
  bin: string;
  cccd: string;
  date_of_birth: string;
  deposit: number;
  detail_address: string;
  district: string;
  email: string;
  fullname: string;
  course_id: number;
  paid_salary: number;
  password: string;
  phone_number: string;
  position: string;
  privileges: string[];
  province: string;
  role: string;
  salary: number;
  staff_id: string;
  town: string;
  username: string;
};
type MyColumnDef<T> = ColumnDef<T> & {
  reloadData?: () => void;
};
export async function columns(
  reloadData: () => void,
): Promise<MyColumnDef<any>[]> {
  return [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "course_id",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              <FormattedMessage id="course.course_id" />
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "course_name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              <FormattedMessage id="course.course_name" />
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "faculty",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              <FormattedMessage id="course.faculty" />
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "student_condition",

        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              <FormattedMessage id="course.student_condition" />
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "course_type",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              <FormattedMessage id="course.course_type" />
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "Chi tiết/Sửa đổi",
        header: () => {
          return <FormattedMessage id="course.detail" />;
        },
        cell: ({ row }) => {
          const [modalIsOpen, setModalIsOpen] = useState(false);

          const openModal = () => {
            setModalIsOpen(true);
          };

          const closeModal = () => {
            setModalIsOpen(false);
          };

          return (
            <div className="relative flex  mr-2">
              <Button
                onClick={openModal}
                className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full"
              >
                +
              </Button>
              {modalIsOpen && (
                <DetailStaff onClose={closeModal} dataInitial={row.original} reload={reloadData} />
              )}
            </div>
          );
        },
      }
    ]
}