import React from 'react'

const MyAccount = () => {
  return (
    <div className="content-page-layout">
        <div className="page-header">
            <h1>My Account</h1>
        </div>
        <div className="content-center-box">
            <div className="account-form">
                <form className="main-form">
                    <div className="field-group flex2">
                        <label>First Name</label>
                        <input type="text" className="form-control" placeholder='Enter first name' />
                    </div>
                    <div className="field-group flex2">
                        <label>Last Name</label>
                        <input type="text" className="form-control" placeholder='Enter last name' />
                    </div>
                    <div className="field-group flexFull">
                        <label>User Name</label>
                        <input type="text" className="form-control" placeholder='Enter username' />
                    </div>
                    <div className="field-group flexFull">
                        <label>Email Address</label>
                        <input type="text" className="form-control" placeholder='Enter email address' />
                    </div>
                    <div className="field-group flexFull">
                        <label>Phone</label>
                        <input type="text" className="form-control" placeholder='Enter phone number' />
                    </div>
                    <div className="field-group btn-groups flexFull">
                        <button type="button" className="btn btn-cancel">Cancel</button>
                        <button type="button" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default MyAccount