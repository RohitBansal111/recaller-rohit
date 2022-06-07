import * as React from "react";
import DataTable from "react-data-table-component";
import EditTagModal from "./EditTagModal";
import { useState } from "react";

const userData = JSON.parse(localStorage.getItem("userData"));
console.log(userData, "userData");
const columns = [
  {
    name: "Date",
    selector: (row) => row.dateString,
    sortable: true,
  },
  {
    name: "Conversation",
    selector: (row) =>
      row.contactDetails.map((data) => {
        return data.firstName + " " + data.lastName;
      }),
  },
  {
    name: "Created By",
    selector: (row) => userData.firstName + " " + userData.lastName,
  },
  {
    name: "Message",
    selector: (row) => row.message,
  },
];

const data = [
  {
    date: "24/03/2022",
    conversation: "Lorum Ipsum",
    createdBy: "User Name",
    message: "Lorum Ipsum",
  },
  {
    date: "24/03/2022",
    conversation: "Lorum Ipsum",
    createdBy: "User Name",
    message: "Lorum Ipsum",
  },
  {
    date: "24/03/2022",
    conversation: "Lorum Ipsum",
    createdBy: "User Name",
    message: "Lorum Ipsum",
  },
  {
    date: "24/03/2022",
    conversation: "Lorum Ipsum",
    createdBy: "User Name",
    message: "Lorum Ipsum",
  },
];

const ScheduledMessagesTable = (props) => {
  return (
    <div
      className="Schedulemessage-data-table common-data-table"
      style={{ height: 500, width: "100%" }}
    >
      <DataTable columns={columns} pagination data={props.data} />
    </div>
  );
};

export default ScheduledMessagesTable;
