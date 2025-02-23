import React from "react";
import { signInWithGoogle, logout } from "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow-lg text-center" style={{ width: "22rem" }}>
        <h1 className="mb-4">MindCare VM</h1>
        <button
          // after successful login, the user shall be directed to the home page
          // the home page is a protected route
          // the user shall be redirected to the login page if they are not logged in
          // the user shall be redirected to the home page if they are logged in

          onClick={signInWithGoogle}
          
          className="btn btn-primary btn-block mb-3"
        >
          <i className="bi bi-google me-2"></i> Sign in with Google
        </button>
        <button
          onClick={logout}
          className="btn btn-danger btn-block"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default App;