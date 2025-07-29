import { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import ProfileSetting from "../components/ProfileSetting";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdOutlineColorLens } from "react-icons/md";
import AppearenceSetting from "../components/AppearenceSetting";
import { GlobalContext } from "../GlobalContext.jsx";
import clsx from "clsx";

function Setting() {
  const [page, setPage] = useState(1);
  const { url,mode } = useContext(GlobalContext);
  const color = { backgroundColor: "white", color: "black" };
  const [info, setInfo] = useState({
    username: "",
    email: "",
    bio: "",
  });

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${url}/util/info`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setInfo({
          username: data.username,
          email: data.email,
          bio: data.bio,
        });
      } else {
        console.error("Failed to fetch user info");
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className={clsx("w-screen h-fit flex flex-col items-center justify-start ",mode===2?"bg-gray-900 text-white":"bg-white")}>
      <Header heading={"Setting"} />
      <p className={clsx(" py-4 w-39/40  text-md",mode===2?"text-gray-400":"")}>
        Manage your account preferences and settings
      </p>
      <div className={clsx("w-39/40 h-12  rounded",mode===2?"bg-gray-900":"bg-gray-100")}>
        <ul className={clsx("w-full  h-full px-2 flex items-center py-1 justify-around ")}>
          <li
            className=" flex items-center w-3/5 md:w-1/4 h-9/10 justify-center gap-2 md:gap-4 rounded"
            style={page == 1 ? color : { color: "gray" }}
            onClick={() => setPage(1)}
          >
           <MdOutlinePrivacyTip className="text-sm md:text-xl" />{" "}
            <span className=" font-semibold">Account & Privacy</span>
          </li>
          <li
            className=" flex items-center w-1/3 md:w-1/4 h-9/10 justify-center gap-2 md:gap-4 rounded"
            style={page == 3 ? color : { color: "gray" }}
            onClick={() => setPage(3)}
          >
            <MdOutlineColorLens className="text-sm md:text-xl" />{" "}
            <span className=" font-semibold">Appearence</span>
          </li>
        </ul>
      </div>
      <div className="w-39/40 mt-5  min-h-screen  md:p-10">
        {page == 1 && <ProfileSetting info={info} setInfo={setInfo}/>}
        {page == 3 && <AppearenceSetting />}
      </div>
    </div>
  );
}

export default Setting;
