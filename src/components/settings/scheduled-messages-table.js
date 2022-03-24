import * as React from 'react';
import DataTable from 'react-data-table-component';
import EditTagModal from './EditTagModal';
import { useState } from 'react'; 

const columns = [
  {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
  },
  {
    name: 'Conversation',
    selector: row => row.conversation,
  },
  {
    name: 'Created By',
    selector: row => row.createdBy,
  },
  {
    name: 'Message',
    selector: row => row.message,
  },
];

const data = [
  {
    date: '24/03/2022',
    conversation: 'Lorum Ipsum',
    createdBy: 'User Name',
    message: 'Lorum Ipsum',
  },
  {
    date: '24/03/2022',
    conversation: 'Lorum Ipsum',
    createdBy: 'User Name',
    message: 'Lorum Ipsum',
  },
  {
    date: '24/03/2022',
    conversation: 'Lorum Ipsum',
    createdBy: 'User Name',
    message: 'Lorum Ipsum',
  },
  {
    date: '24/03/2022',
    conversation: 'Lorum Ipsum',
    createdBy: 'User Name',
    message: 'Lorum Ipsum',
  }
]

const ScheduledMessagesTable = () => {
  return (
    <div className="Schedulemessage-data-table common-data-table" style={{ height: 500, width: '100%' }}>
      <DataTable
       columns={columns} 
       pagination
       data={data} 
      />
    </div>
  ) 
}

export default ScheduledMessagesTable