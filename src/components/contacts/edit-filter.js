import React from 'react'
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { Input } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const EditFilter = () => {
  return (
    <div className="create-filter">
        <div className="select-property-filter">
            <form>
                <div className="filter-top">
                   <div className='full-width-screen'>
                    <FormControl fullWidth>
                            <InputLabel className='input-label-control' id="demo-simple-select-label">Filter Name *</InputLabel>
                            <Input
                            type="text"
                            name="val"
                            className='input-field-control'
                            min="0"
                            ></Input>
                            <span className="spanError"></span>
                        </FormControl>
                   </div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Properties</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Properties"
                        >
                            <MenuItem value={"Joined Date"}>Joined Date</MenuItem>
                            <MenuItem value={"Last Active"}>Last Active</MenuItem>
                            <MenuItem value={"Campaigns"}>Campaigns</MenuItem>
                        </Select>
                        <span className="spanError">  </span>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rule</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Properties"
                        >
                            <MenuItem value={"Joined Date"}>Joined Date</MenuItem>
                            <MenuItem value={"Last Active"}>Last Active</MenuItem>
                            <MenuItem value={"Campaigns"}>Campaigns</MenuItem>
                        </Select>
                        <span className="spanError">  </span>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Tag Name</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Properties"
                        >
                            <MenuItem value={"Joined Date"}>Joined Date</MenuItem>
                            <MenuItem value={"Last Active"}>Last Active</MenuItem>
                            <MenuItem value={"Campaigns"}>Campaigns</MenuItem>
                        </Select>
                        <span className="spanError">  </span>
                    </FormControl>
                </div>
                <div className="filter-bottom filter-edit-action">
                    <div className='filter-add-clone'>
                        <button
                            type="button"
                            className="btn btn-add"
                        >
                            <AddIcon />
                            Add Rule
                        </button>
                    </div>
                    <div className="filter-clear-save">
                        <button
                            type="button"
                            className="cancel-action"
                        >
                            <DeleteIcon />
                            Delete Filter
                        </button>
                        <button
                            type="button"
                            className="cancel-action"
                        >
                            <ClearIcon />
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="save-action"
                        >
                            <DoneIcon /> Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditFilter