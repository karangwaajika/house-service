import Button from "./ui/Button";
import InputField from "./ui/InputField";
import { useState } from "react";
import axios from "axios";
import ButtonLoading from "./ui/ButtonLoading";
import loadingImg from "/images/n-loading.gif";
import { useNavigate } from "react-router-dom";
import FlashMessage from "./ui/FlashMessage";
import googlePicture from "/images/google.png";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_LOGIN_USER_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_LOGIN_USER_API;
    axios
      .post(url, {
        username: form.username,
        password: form.password,
      })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem(
            import.meta.env.VITE_REACT_APP_TOKEN,
            res.data.token
          ); //store the token in a local storage
          if (res.data.user.is_superuser) {
            navigate("/dashboard/home");
          } else {
            navigate("/service/home");
          }
        } else {
          setMessage(res.data);
        }
      })
      .catch((err) => {
        setMessage({
          success: false,
          message: err.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="login-form">
      <div className="card-a">
        <div className="card-header">Sign up</div>
        {message && (
          <FlashMessage
            message={message.message}
            isSuccess={message.success}
            clearMessage={clearMessage}
          />
        )}
        <div className="card-body">
          <form onSubmit={submitForm} className="login_form">
            <div>
              Username:
              <InputField
                type="text"
                name="username"
                id="username"
                label="Username"
                icon="fa-solid fa-user"
                placeholder="username"
                handleChange={handleChange}
              />
            </div>
            <div>
              Password:
              <InputField
                type="password"
                name="password"
                id="password"
                label="Password"
                icon="fa-solid fa-lock"
                placeholder="*************"
                handleChange={handleChange}
              />
            </div>
            <div>
              {isLoading ? (
                <ButtonLoading
                  text="Register"
                  className="btn-dark"
                  img={loadingImg}
                />
              ) : (
                <Button text="Register" className="btn-dark" />
              )}
            </div>
            <div>
              <button type="button" className="btn-google">
                <img
                  src={googlePicture}
                  alt="Google icon"
                  className="google-icon"
                  height={100}
                  width={100}
                />{" "}
                Register with google
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer-login">
          Already have an account?{" "}
          <i
            style={{
              color: "#0e0ed1",
              fontWeight: "bolder",
              fontStyle: "normal",
              cursor: "pointer",
            }}
            onClick={()=>navigate('/login')}
          >
            Login
          </i>
        </div>
      </div>
    </div>
  );
}
