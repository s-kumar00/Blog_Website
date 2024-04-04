import {
  Alert,
  Button,
  Checkbox,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastOptions } from "../utils/utility";
import { toast } from "react-toastify";
import { loginRoute } from "../Api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    if (!email || !password) {
      return dispatch(signInFailure("Please fill out all fields."));
    }
    try {
      dispatch(signInStart());
      const dataRes = await loginRoute({ email, password });
      if (dataRes.data.success === false) {
        return dispatch(signInFailure(dataRes.data.message));
      }
      toast.success(dataRes.data.message, toastOptions);
      navigate("/");
      dispatch(signInSuccess(dataRes.data.user));
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="h-screen items-center mt-10 sm:mt-40">
      <div className="flex pl-5 pr-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 rounded-lg">1-Bit</span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign in with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                addon="📧"
                color={
                  errorMessage && errorMessage.includes("User") ? "failure" : ""
                }
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="**********"
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
            <div className="flex justify-between items-center text-sm">
              <Checkbox id="remember" label="Remember me" className="w-5 h-5" />
              <Link to="/forgot-password" className="text-blue-500">
                Forgot Password?
              </Link>
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
                "Sign In"
              )}
            </Button>
            {/* <OAuth /> */}
          </form>
          <div className="flex gap-2 text-sm mt-5 justify-center">
            <span>Don't Have an account?</span>
            <Link to="/register" className="text-blue-500">
              Sign Up
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
}
