import "./AuthForm.css";
import GoogleLogo from "../../Assets/Image/google.svg";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app from "../../Firebase/Firebase.init";
import toast from "react-hot-toast";

const Login = () => {
  const provider = new GoogleAuthProvider();
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
    const email = event.target.email.value;
    const password = event.target.password.value;
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        toast.success("Login Successfull", { id: "success2" });
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="auth-form-container ">
      <div className="auth-form">
        <h1>Login</h1>
        <form onSubmit={handleSignUp}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input type="text" name="email" id="email" />
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input type="password" name="password" id="password" />
            </div>
          </div>
          <button type="submit" className="auth-form-submit">
            Login
          </button>
        </form>
        <p className="redirect">
          New to Tech Geeks?{" "}
          <span onClick={() => navigate("/signup")}>Create New Account</span>
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

export default Login;
