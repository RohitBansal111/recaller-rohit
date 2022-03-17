import React from 'react'
import { Link } from 'react-router-dom'

const PreparationStep1 = () => {
  return (
    <div className="wizard-main-content">
        <ul className="wizard-steps-bar">
          <li>1. Create a New Spreadsheet</li>
          <li>2. Add column labels to your first row</li>
          <li>3. Add your contacts below the first row.</li>
          <li>4. Done? Save your spreadsheet as a CSV file type and upload it below</li>
        </ul>
        <div className="upload-drag-section">
            <div className="text-center">
              <i className="material-icons">cloud_upload</i>
              <h3>Drag and drop a CSV file here to upload</h3>
              <h4>Or</h4>
              <div className='select-file'>
                <span>Select a file</span>
                <input type="file" />
              </div>
            </div>
        </div>
    </div>
  )
}

export default PreparationStep1