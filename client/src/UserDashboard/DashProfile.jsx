import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/userSlice";
import {
  deleteUserAccountROute,
  updatePasswordRoute,
  updateUserAccountRoute,
} from "../Api/userApi";
import { toastOptions } from "../utils/utility";
import { toast } from "react-toastify";
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { app } from "../firebase";

const DashProfile = () => {
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (image) {
  //     handleFileUpload(image);
  //   }
  // }, [image]);
  // const handleFileUpload = async (image) => {
  //   const storage = getStorage(app);
  //   const fileName = new Date().getTime() + image.name;
  //   const storageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, image);
  //   uploadTask.on(
  //     "state_changed",
  //     async (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       setImagePercent(Math.round(progress));
  //     },
  //     (error) => {
  //       setImageError(true);
  //     },
  //     async () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
  //         setFormData({ ...formData, profilePicture: downloadURL })
  //       );
  //     }
  //   );
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUSerUpdate = async (e) => {
    e.preventDefault();
    const username = formData.username;
    try {
      const response = await updateUserAccountRoute(currentUser._id, {
        username,
      });
      if (response.data.success) {
        dispatch(updateUserSuccess(response.data.user));
        navigate("/dashboard");
        toast.success(response.data.message, toastOptions);
      } else {
        toast.error(response.data.message, toastOptions);
        dispatch(updateUserFailure(response.data.message));
      }
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const oldPassword = e.target.current_password.value;
    const newPassword = e.target.new_Password.value;
    const confirmNewPassword = e.target.confirm_Password.value;

    if (newPassword !== confirmNewPassword) {
      return toast.error("Password does not match", toastOptions);
    }

    try {
      const response = await updatePasswordRoute(currentUser._id, {
        oldPassword,
        newPassword,
      });
      if (response.data.alert) {
        handleSignOut();
        toast.success(response.data.message, toastOptions);
      } else {
        toast.error(response.data.message, toastOptions);
      }
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteUserAccountROute(currentUser._id);
      if (response.data.alert) {
        dispatch(deleteUserSuccess());
        navigate("/");
        toast.success("Account deleted...", toastOptions);
      } else {
        dispatch(deleteUserFailure());
        toast.success(response.data.message, toastOptions);
      }
    } catch (error) {
      dispatch(deleteUserFailure());
      toast.error(error.message, toastOptions);
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/login");
  };

  return (
    <section className="w-full justify-center items-center">
      <div className="relative w-3/4 sm:w-3/4 top-5 sm:top-14 ml-20">
        <div className="flex-col">
          {/* form-1 */}
          <div className="flex flex-col items-center sm:flex-row">
            <div className="flex-col mb-3 sm:mb-0">
              <h1 className="font-bold text-2xl">Personal Information</h1>
              <h2 className="text-gray-30 text-sm">
                Update avatar & name associated with your account.
              </h2>
            </div>
            <form onSubmit={handleUSerUpdate} className="max-w-lg mx-auto">
              <div className="flex items-center gap-x-3">
                <div className="flex-col">
                  <img
                    src={
                      currentUser === null
                        ? ""
                        : "https://imgs.search.brave.com/GNIFWqfPKKf_ORRCV58z1gW89zw2_PdDxQod3tSF4lM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS80MDQt/NDA0MjcxMF9jaXJj/bGUtcHJvZmlsZS1w/aWN0dXJlLXBuZy10/cmFuc3BhcmVudC1w/bmcucG5n"
                    }
                    className="h-20 w-20 rounded-full"
                  />
                  <p className="text-sm">
                    {imageError ? (
                      <span className="text-red-700">
                        Error uploading image (file size must be less than 2 MB)
                      </span>
                    ) : imagePercent > 0 && imagePercent < 100 ? (
                      <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
                    ) : imagePercent === 100 ? (
                      <span className="text-green-700">
                        uploaded successfully
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                <div>
                  <input
                    className="block w-3/4 sm:w-full text-md text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    id="user_avatar"
                    accept="image/*"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <p className="pt-1">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <input
                type="text"
                id="username"
                placeholder="First Name"
                defaultValue={currentUser === null ? "" : currentUser.username}
                onChange={handleChange}
                className="w-full mt-5 p-2 border text-black border-gray-300 rounded"
              />

              <input
                type="text"
                id="email"
                placeholder={currentUser === null ? "" : currentUser.email}
                className="w-full mt-5 p-2 border border-gray-300 rounded"
                disabled
              />
              <button
                type="submit"
                className="w-1/4 h-10 bg-blue-600 mt-2 rounded-md"
              >
                Update
              </button>
            </form>
          </div>

          <div className="border border-gray-20 mt-5 dark:border-gray-50"></div>

          {/* form-2 */}
          <div className="flex flex-col items-center sm:flex-row">
            <div>
              <h1 className="font-bold text-2xl">Change password</h1>
              <h2 className="text-gray-30 text-sm">
                Update your password associated with your account.
              </h2>
            </div>
            <form onSubmit={handlePasswordUpdate} className="max-w-lg mx-auto">
              <input
                type="text"
                id="current_password"
                placeholder="Current Password"
                required
                className="w-full mt-5 p-2 border text-black border-gray-300 rounded"
              />
              <input
                type="text"
                id="new_Password"
                placeholder="New Password"
                required
                className="w-full mt-5 p-2 border text-black border-gray-300 rounded"
              />
              <input
                type="text"
                id="confirm_Password"
                placeholder="ConfirmPassword"
                required
                className="w-full mt-5 p-2 text-black border border-gray-300 rounded"
              />

              <button
                type="submit"
                className="w-1/4 h-10 bg-blue-600 mt-2 rounded-md"
              >
                Update
              </button>
            </form>
          </div>

          <div className="border border-gray-20 mt-5 mb-5 dark:border-gray-50"></div>
          <button onClick={handleDelete} className="bg-red-500 p-2 rounded-lg">
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default DashProfile;
