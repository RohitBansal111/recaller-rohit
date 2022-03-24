import * as React from 'react';
import DataTable from 'react-data-table-component';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTagModal from './EditTagModal';
import { useState } from 'react';

const columns = [
  {
      name: 'Name',
      selector: row => row.productname,
  },
  {
      name: 'Actions',
      selector: row => row.productAction,
  },
];

const data = [
  {
    productname: 'New Product Hyper',
  },
  {
    productname: 'Super Market Package',
  }
]

const ConversationTagsTable = () => {
  const [openEditTagModal, setOpenEditTagModal] = useState(false);

  const openETModal = () => { setOpenEditTagModal(true) }
  const handleCloseETModal = () => { setOpenEditTagModal(false) }
  return (
    <div className="tags-data-table common-data-table" style={{ height: 500, width: '100%' }}>
      <DataTable
       columns={columns} 
       pagination
       data={
        data ? data.map((item) => {
            return{
              productname: item.productname,
              productAction: <div className="table-action"> <EditIcon titleAccess="Edit" onClick={openETModal} />  <DeleteIcon titleAccess='Delete' />  </div>
            }
        }) : []
       } 
      />
      <EditTagModal open={openEditTagModal} handleCloseETModal={handleCloseETModal} />
    </div>
  ) 
}

export default ConversationTagsTable