"use client";
//please do the signin page ehre
import React, { useState } from "react";
import "./login.css"; // Assuming your CSS file is named login.css

const LoginSignup = () => {
  const [activeForm, setActiveForm] = useState("signin"); // Tracks active form (signup/signin)

  const handleFormSwitch = (form) => {
    setActiveForm(form);
  };

  return (
    <div className="container" id="container">
      <div
        className={`form-container ${activeForm === "signup" ? "sign-up" : ""}`}
      >
        <form>
          <h1>{activeForm === "signup" ? "Create Account" : "Sign In"}</h1>
          <div className="social-icons">
            <p>
              {activeForm === "signup"
                ? "Sign Up with Google"
                : "Login with Google"}
              <a href="#" className="icon" id="google-signin-button">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
            </p>
          </div>
          <span>
            {activeForm === "signup"
              ? "Enter your credentials for registration"
              : "Enter your email and password"}
          </span>
          {activeForm === "signup" && <input type="text" placeholder="Name" />}
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          {activeForm === "signin" && (
            <a href="forgotpassword.html">Forget Your Password?</a>
          )}
          <button>{activeForm === "signup" ? "Sign Up" : "Sign In"}</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome!</h1>
            <p>Already a Member? Login now.</p>
            <button
              className="hidden"
              id="login"
              onClick={() => handleFormSwitch("signin")}
            >
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>New Member?</h1>
            <p>Create your account now!</p>
            <button
              className="hidden"
              id="register"
              onClick={() => handleFormSwitch("signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <a
        href="/FYP/index.html"
        style={{
          position: "absolute",
          bottom: "50px",
          left: "450px",
          color: "#000",
          textDecoration: "none",
          transition: "color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.color = "#512da8")}
        onMouseOut={(e) => (e.target.style.color = "#000")}
      >
        <i className="fas fa-arrow-left"></i> Back to Home
      </a>
    </div>
  );
};

export default LoginSignup;
