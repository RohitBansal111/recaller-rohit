

const OPTInOut = () => {
  return (
    <div className="content-page-layout">
        <div className="page-header subheading-bar">
            <div className="header-text">
                <h1>Settings</h1>
                <p>Setting / Text / Opt-In-Out</p>
            </div>
        </div>
        <div className="setting-page-main">
            <div className="content-center-box">
                <div className="account-form">
                    <form className="main-form">
                        <div className="field-group flex2">
                            <label>Opt-In Keywords</label>
                            <input type="text" className="form-control" placeholder='Enter first name' />
                        </div>
                        <div className="field-group flex2">
                            <label>Opt-Out Keywords</label>
                            <input type="text" className="form-control" placeholder='Enter last name' />
                        </div>
                        <div className="field-group flexFull">
                            <label>Opt-In Confirmation Message</label>
                            <textarea type="text" className="form-control" placeholder='You have successfully been resubscribed to messages from this number. Reply HELP for help. Reply STOP to unsubscribe. Msg Data Rates May Apply'></textarea>
                        </div>
                        <div className="field-group flexFull">
                            <label>Opt-Out Confirmation Message</label>
                            <textarea type="text" className="form-control" placeholder='You have successfully been unsubscribed. You will not receive any more messages from this number. Reply START to resubscribe'></textarea>
                        </div>
                        <div className="field-group btn-groups flexFull">
                            <button type="button" className="btn btn-cancel">Cancel</button>
                            <button type="button" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  ) 
}

export default OPTInOut