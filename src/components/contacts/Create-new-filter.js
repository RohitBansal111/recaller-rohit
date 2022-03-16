import React, { useState } from 'react'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import ClearIcon from '@mui/icons-material/Clear';

const CreateNewFilter = () => {
  const [age, setAge] = useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className='create-filter'>
        <div className="select-property-filter">
          <form>
            <div className="filter-top">
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Age" 
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <button type="button" className='clear-button'> <ClearIcon /> </button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default CreateNewFilter