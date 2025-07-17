import React from "react";
import TextField from "@mui/material/TextField";
function ProfileSetting() {
  return (
    <div>
      <h1>Profile Information</h1>
      <p>Update your personal information and profile details</p>
      <div>
        <p>UserName</p>
        <input type="text" />
      </div>
       <div>
        <p>Email Address</p>
        <input type="text" disabled val />
       </div>
    </div>
  );
}

export default ProfileSetting;
