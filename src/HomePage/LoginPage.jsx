import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="containerrr">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow-lg border-sucess">
            <div className="card-body">
              <h2 className="text-center text-success">
                Welcome to PlantWorld
              </h2>
              <p className="text-center text-secondary">
                One stop for all the variety of plants
              </p>

              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label text-success">
                    User Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-success">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="text-center mb-3">
                  <a href="#" className="text-muted">
                    Forgot Password?
                  </a>
                </div>
                <div className="text-center mb-3">
                  <button type="submit" className="btn btn-success">
                    Login
                  </button>
                </div>
                <div className="text-center">
                  <p>
                    Don't have an account? <a href="#">Signup</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
