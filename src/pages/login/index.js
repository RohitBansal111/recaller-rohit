import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="form-page-layout">
          <div className="center-form-box">
            <h2>Login Now</h2>
            <form className="main-form">
              <div className="field-group flexFull">
                <label htmlFor="name"> Email Address </label>
                <input type="text" className="form-control" placeholder="Enter email address" />
              </div>
              <div className="field-group flexFull">
                <label htmlFor="name"> Password </label>
                <input type="text" className="form-control" placeholder="Enter password" />
              </div>
              <div className="field-group flex-2">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <div className="field-group flex-2 d-flex align-items-center">
                <Link to="/forgot-password" className="link-router">Forgot Password</Link>
              </div>
            </form>
          </div>
        </div>
    )
  }
  
  export default Login 