import React, { useContext, useEffect, useState } from "react";
import { IoSaveOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../GlobalContext.jsx";
import clsx from "clsx";
function ProfileSetting({ info, setInfo }) {
  const navigate = useNavigate();
  const {
    url,
    successMsg,
    ErrorMsg,
    setSpinner,
    setIsAuth,
    setCurUser,
    setSidebarOpen,
    mode
  } = useContext(GlobalContext);
  
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const confirmation = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmation) return;
    setSpinner(true);
    try {
      const response = await fetch(`${url}/util/account/delete`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });

      const parsedResponse = await response.json();
      if (!parsedResponse.success) {
        return ErrorMsg(parsedResponse.message);
      }
      setIsAuth(false);
      navigate("/");
      setCurUser("");
      setSidebarOpen(false);
      return successMsg(parsedResponse.message);
    } catch (err) {
      console.error(err);
      return ErrorMsg("Unable to delete your account!");
    } finally {
      setSpinner(false);
      setInfo({
        username: "",
        email: "",
        bio: "",
      });
    }
  };
  const [passwordObj, setPasswordObj] = useState({
    oldPassword: "",
    confirmPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setPasswordObj({ ...passwordObj, [e.target.name]: e.target.value });
  };

  const handleInfoChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    if (passwordObj.newPassword !== passwordObj.confirmPassword) {
      return ErrorMsg("New Password and Confirm Password do not match!");
    }
    setSpinner(true);
    try {
      const response = await fetch(`${url}/util/password/new`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          newPassword: passwordObj.newPassword,
          oldPassword: passwordObj.oldPassword,
        }),
        credentials: "include",
      });

      const parsedResponse = await response.json();
      if (!parsedResponse.success) {
        return ErrorMsg(parsedResponse.message);
      }
      return successMsg(parsedResponse.message);
    } catch (err) {
      console.error(err);
      return ErrorMsg("Unable to change your password!");
    } finally {
      setSpinner(false);
      setPasswordObj({
        oldPassword: "",
        confirmPassword: "",
        newPassword: "",
      });
    }
  };

  const handleBioSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    try {
      const response = await fetch(`${url}/util/bio`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ bio: info?.bio }),
        credentials: "include",
      });

      const parsedResponse = await response.json();
      if (!parsedResponse.success) {
        return ErrorMsg(parsedResponse.message);
      }
      return successMsg(parsedResponse.message);
    } catch (err) {
      console.error(err);
      return successMsg("Unable to save your Changes!");
    } finally {
      setSpinner(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-start p-5">
      <h1 className="text-3xl  font-bold ">Profile Information</h1>
      <p className="text-gray-500 my-5">
        Update your personal information and profile details
      </p>
      <div className=" w-full h-20">
        <span>Username</span>
        <p className={clsx("border w-full h-10  rounded outline-0 pl-2 pt-2 mt-1",mode===2?"border-gray-800":"border-gray-300")}>
          {info?.username}
        </p>
      </div>
      <div className=" w-full h-20">
        <p>Email Address</p>
        <p className={clsx("border w-full h-10  rounded outline-0 pl-2 pt-2 mt-1",mode===2?"border-gray-800":"border-gray-300")}>
          {info?.email}
        </p>
      </div>
      <form
        className=" w-full h-40 flex flex-col gap-2 "
        onSubmit={handleBioSubmit}
      >
        <p>Bio</p>
        <textarea
          className={clsx("border w-full h-20  rounded outline-0 pl-2 pt-2",mode===2?"border-gray-800":"border-gray-300")}
          value={info?.bio}
          name="bio"
          onChange={handleInfoChange}
        ></textarea>
        <button className="bg-purple-600 w-40 h-10 mt-2 flex items-center justify-center gap-2 rounded  text-white">
          <IoSaveOutline className="text-white text-md" /> Save Changes
        </button>
      </form>
      <hr className="bg-gray-100  h-0.25 border-gray-100 w-full my-10" />
      <h1 className="text-3xl  font-bold ">Change Password</h1>
      <p className="text-gray-500 my-5">
        Update your password to keep your account secure
      </p>
      <form
        className=" w-full h-fit flex flex-col gap-2"
        onSubmit={handlePasswordChangeSubmit}
      >
        <PasswordInput
          name="oldPassword"
          value={passwordObj.oldPassword}
          onChangehandler={handleChange}
          head="Old Password"
        />
        <PasswordInput
          name="newPassword"
          value={passwordObj.newPassword}
          onChangehandler={handleChange}
          head="New Password"
        />
        <PasswordInput
          name="confirmPassword"
          value={passwordObj.confirmPassword}
          onChangehandler={handleChange}
          head="Confirm Password"
        />

        <button className="bg-purple-600 w-40 h-10 mt-2 flex items-center justify-center gap-2 rounded  text-white">
          {" "}
          Update Password
        </button>
      </form>
      <hr className="bg-gray-100  h-0.25 border-gray-100 w-full my-10" />
      <h1 className="text-3xl  font-bold ">Privacy Setting</h1>
      <p className="text-gray-500 my-5">
        Control your privacy and data sharing preferences
      </p>
      <div className="w-full h-10  flex justify-between items-center">
        <p className="text-blue-600 hover:underline">Manage Cookies</p>
        <p className="text-blue-600 hover:underline">Privacy Policy</p>
      </div>
      <form
        onSubmit={handleDeleteAccount}
        className="w-full h-15 flex items-center justify-between mt-5"
      >
        <button className="bg-red-600 w-40 h-10 mt-2 flex items-center justify-center gap-2 rounded  text-white">
          Delete Account
        </button>
      </form>
      <p className="text-gray-400">
        <span className="text-orange-600">*</span>This action cannot be undone.
        This will permanently delete your account.{" "}
      </p>
    </div>
  );
}

function PasswordInput({ name, value, onChangehandler, head }) {
  const [show, setShow] = useState(true);
  const {mode}=useContext(GlobalContext)
  return (
    <div className=" w-full h-20">
      <span>{head}</span>
      <div className="w-full h-11  flex items-center bg-white rounded-sm">
        <input
          className={clsx(" w-full h-10  rounded text-gray-950 outline-0 flex item-center pl-2 border-0")}
          type={show ? "password" : "text"}
          name={name}
          value={value}
          onChange={onChangehandler}
        />
        <span
          className="h-full w-1/12 grid place-items-center"
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? <FaRegEyeSlash className="text-gray-950"/> : <FaRegEye className="text-gray-950"/>}
        </span>
      </div>
    </div>
  );
}

export default ProfileSetting;
