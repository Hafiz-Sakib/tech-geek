import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../../Firebase/Firebase.init";
import "./SIgnUp.css";
import toast from "react-hot-toast";

const provider = new GoogleAuthProvider();
const Signup = () => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });

  const handleEmailBlur = (emailInput) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setEmail({ value: emailInput, error: "" });
    } else {
      setEmail({ value: "", error: "Invalid Email!" });
    }
  };
  const handlePasswordBlur = (passwordInput) => {
    if (passwordInput.length < 7) {
      setPassword({ value: "", error: "Password too Short" });
    } else {
      setPassword({ value: passwordInput, error: "" });
    }
  };
  const handleconfirmPasswordBlur = (confirmPasswordInput) => {
    if (confirmPasswordInput === password.value) {
      setConfirmPassword({ value: confirmPasswordInput, error: "" });
    } else {
      setConfirmPassword({ value: "", error: "Password Mismatched" });
    }
  };

  const navigate = useNavigate();
  const googleAuth = () => {
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.messages;
        console.log(errorMessage);
      });
  };
  const handleSignUp = (event) => {
    event.preventDefault();

    const auth = getAuth(app);
    if (email.value === "") {
      setEmail({ value: "", error: "Email is Required!!" });
    }
    if (password.value === "") {
      setPassword({ value: "", error: "Password is Required!!" });
    }
    if (
      email.value &&
      password.value &&
      confirmPassword.value === password.value
    ) {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          // const user = userCredential.user;
          toast.success("Registration Successfull", { id: "success" });
          navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          if (errorMessage.includes("email-already-in-use")) {
            toast.error("User Already Exists", { id: "error" });
          } else {
            toast.error(errorMessage, { id: "error2" });
          }
        });
    }
  };

  return (
    <div className="auth-form-container ">
      <div className="auth-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                id="email"
                onBlur={(event) => {
                  handleEmailBlur(event.target.value);
                }}
              />
            </div>
          </div>

          {email?.error && <p className="error">{email.error}</p>}
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                name="password"
                id="password"
                onBlur={(event) => handlePasswordBlur(event.target.value)}
              />
            </div>
          </div>
          {password.error && <p className="error">{password.error}</p>}
          <div className="input-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                name="confirmPassword"
                id="confirm-password"
                onBlur={(event) =>
                  handleconfirmPasswordBlur(event.target.value)
                }
              />
            </div>
          </div>
          {confirmPassword.error && (
            <p className="error">{confirmPassword.error}</p>
          )}
          <button type="submit" className="auth-form-submit">
            Sign Up
          </button>
        </form>
        <p className="redirect">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
        <div className="horizontal-divider">
          <div className="line-left" />
          <p>or</p>
          <div className="line-right" />
        </div>
        <div className="input-wrapper">
          <button className="google-auth" onClick={googleAuth}>
            <img src={GoogleLogo} alt="" />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
