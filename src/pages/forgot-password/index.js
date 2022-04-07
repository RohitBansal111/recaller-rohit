import { Link } from "react-router-dom"

const ForgotPassword = () => {
    return (
        <div className="form-page-layout">
          <div className="center-form-box">
            <h2>Forgot Password</h2>
            <form className="main-form">
              <div className="field-group flexFull">
                <label htmlFor="name"> Enter Email Address </label>
                <input type="text" className="form-control" placeholder="Enter email address" />
              </div>
              <div className="field-group flex-2">
                <button type="submit" className="btn btn-primary">
                  Submit Now
                </button>
              </div>
              <div className="field-group flex-2 d-flex align-items-center">
                <Link to="/login" className="link-router">Back to Login</Link>
              </div>
            </form>
          </div>
        </div>
    )
  }
  
  export default ForgotPassword 