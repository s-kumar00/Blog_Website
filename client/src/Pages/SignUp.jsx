import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastOptions } from "../utils/utility";
import { toast } from "react-toastify";
import { registerRoute } from "../Api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const { loading, errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        dispatch(signInStart());
        const dataRes = await registerRoute(formData);
        if (dataRes.data.success === true) {
          toast.success(dataRes.data.message, toastOptions);
          navigate("/login");
          dispatch(signInSuccess(dataRes.data.user));
        } else {
          dispatch(signInFailure(dataRes.data.message));
        }
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = formData;
    if (!username || !email || !password || !confirmPassword) {
      dispatch(signInFailure("Please fill out all fields."));
    } else if (username.length < 3) {
      dispatch(signInFailure("Username must be at least 3 characters long"));
      return false;
    } else if (password.length < 6) {
      dispatch(signInFailure("Password must be at least 6 characters long"));
      return false;
    } else if (password !== confirmPassword) {
      dispatch(signInFailure("Passwords do not match"));
      return false;
    } else if (!email.includes("@")) {
      dispatch(signInFailure("Email must be valid"));
      return false;
    } else if (password.includes(username)) {
      dispatch(signInFailure("Password must not contain username"));
      return false;
    } else if (password.includes(email)) {
      dispatch(signInFailure("Password must not contain email"));
      return false;
    }
    return true;
  };

  return (
    <div className="h-full mt-5 sm:mt-20">
      <div className="flex pl-5 pr-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r rounded-lg text-black">
              1-Bit
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. Fill up the form to create an account.
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                addon="👤"
                color={
                  errorMessage && errorMessage.includes("Username")
                    ? "failure"
                    : ""
                }
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                addon="📧"
                color={
                  errorMessage && errorMessage.includes("User" || "Email")
                    ? "failure"
                    : ""
                }
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                addon="🔒"
                color={
                  errorMessage && errorMessage.includes("Password")
                    ? "failure"
                    : ""
                }
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Confirm password" />
              <TextInput
                type="confirmPassword"
                placeholder="confirmPassword"
                id="confirmPassword"
                addon="🔒"
                color={
                  errorMessage && errorMessage.includes("Password")
                    ? "failure"
                    : ""
                }
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              outline
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            {/* <OAuth /> */}
          </form>
          <div className="flex gap-2 text-sm mt-5 justify-center">
            <span>Have an account?</span>
            <Link to="/login" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
