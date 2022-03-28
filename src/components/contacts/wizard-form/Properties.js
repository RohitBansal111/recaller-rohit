import React from 'react'

const Properties = ({step, setStep}) => {
  const nextStep = () => {
    setStep(step + 1)
  }
  const backStep = () => {
    setStep(step - 1)
  }
  return (
        <div className="wizard-main-content">
            <p>We detected the following columns. You can map them to an existing LocalContacts property if they were not automatically mapped correctly or you can unselect them to exclude them from the upload.</p>
            <div className="main-form">
                <h2>Logic For Existing Customers</h2>
                <div className="field-group">
                  <label>1. Choose which mapped property to match with existing contacts</label>
                  <select className="form-control">
                    <option selected>Selected map property</option>
                    <option>Property 1</option>
                  </select>
                </div>
                <div className="field-group">
                  <label>2. What would you like to do with existing contacts?</label>
                  <div className="multi-checkbox">
                      <div className="checkbox-box">
                          <input name="contacts" type="radio" />
                          <label>Update Existing Contacts</label>
                      </div>
                      <div className="checkbox-box">
                          <input name="contacts" type="radio" />
                          <label>Skip</label>
                      </div>
                  </div>
                </div>
                <div className="field-group flexFull text-center mt-3">
                    <button type="button" className="btn btn-cancel me-3" onClick={backStep}> Back </button>
                    <button type="button" className="btn btn-primary" onClick={nextStep}> Proceed </button>
                </div>
            </div>
        </div>
  )
}

export default Properties