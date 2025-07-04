import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import OtpModal from "../components/otpModal";

function InputFeild({ type, placeholder, name, value, onChangeHandler }) {
  return (
    <div className="w-full h-11  bg-white rounded-sm">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        required
        value={value}
        onChange={onChangeHandler}
        className="h-full w-full p-4 bg-transparent focus:border-0 outline-0"
      />
    </div>
  );
}

function Auth() {
  return (
    <GoogleOAuthProvider clientId="802592221838-bpulcqvit4cg7suqolnkbh66esmv8j6o.apps.googleusercontent.com">
      <OAuth></OAuth>
    </GoogleOAuthProvider>
  );
}

function OAuth() {
  const navigate = useNavigate();
  const { isAuth, setIsAuth, url, ErrorMsg, successMsg ,curUser,setCurUser} =
    useContext(GlobalContext);

  //google login function handlers
  const responseGoogle = async (google_res) => {
    try {
      if (google_res["code"]) {
        const response = await fetch(
          `${url}/auth/google-web?code=${google_res["code"]}`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            credentials: "include",
          }
        );

        const parsedResponse = await response.json();
        console.log("Response from backend : ", parsedResponse);
        if (parsedResponse.success == false) {
          return ErrorMsg(parsedResponse.message);
        }
        setIsAuth(true);
        navigate("/");
        setCurUser(parsedResponse.curUser);
        successMsg(parsedResponse.message);
      }
    } catch (err) {
      console.log("Something went wrong : ", err);
      return ErrorMsg("Something went wrong . Please try again!");
    }
  };
  //google login function
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  const [page, setPage] = useState("Signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [credential, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [temp, setTemp] = useState({});
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [disable, setDisable] = useState(true);

  const onChangeHandler = (e) => {
    setCredentials((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSignup = async () => {
    try {
      if (step == 1) {
        //sending otp to user email
        setTemp(credential);
        const response = await fetch(`${url}/otp/get`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: credential.email }),
          credentials:"include"
        });
        const parsedResponse = await response.json();

        if (!parsedResponse.success) {
          return ErrorMsg(parsedResponse.message);
        }
        setStep(2);
        setDisable(false);
        setShowModal(true);
        return successMsg(parsedResponse.message);
      } else if (step == 2) {
        //after otp is send to user email
        if(otp.length<6) return ErrorMsg("Please Enter a valid OTP!");
        const response = await fetch(`${url}/auth/credential/otp/signup`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            username: temp.username,
            email: temp.email,
            password: temp.password,
            otp: otp,
          }),
          credentials:"include"
        });

        const parsedResponse = await response.json();
        if (!parsedResponse.success) {
          if (!parsedResponse.endProcess && !parsedResponse.anotherProvider)
            return ErrorMsg(parsedResponse.message);
        }

        setTemp({});
        setDisable(true);
        setShowModal(false);
        setOtp("");
        setCredentials({
          username: "",
          email: "",
          password: "",
        });
        setStep(1);
        if (!parsedResponse.success && parsedResponse.endProcess)
          return ErrorMsg(parsedResponse.message);
        if (!parsedResponse.success && parsedResponse.anotherProvider)
          return ErrorMsg(parsedResponse.message);
        setIsAuth(true);
        navigate("/");
        setCurUser(parsedResponse.curUser);
        return successMsg(parsedResponse.message);
      }
    } catch (err) {
      return ErrorMsg("Unable to Signup! Try again.");
    }
  };

  const handleLogin = async () => {
    try{
      const response =await fetch(`${url}/auth/credential/login`,{
        method:"POST",
        headers:{
          "content-type" :"application/json"
        },
        body:JSON.stringify({email:credential.email,password:credential.password}),
        credentials:"include"
      });

      const parsedResponse = await response.json();

      if(!parsedResponse.success) return ErrorMsg(parsedResponse.message);
      setIsAuth(true);
      navigate("/");
      console.log(parsedResponse);
        setCurUser(parsedResponse.curUser);
      return successMsg(parsedResponse.message);

    }catch(err){
       return ErrorMsg("Unable to Login! Try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (page === "Signup") handleSignup();
    else handleLogin();
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center  bg-linear-to-br from-purple-200 to-cyan-200  relative">
    
      {showModal && (
        <OtpModal
          handleSubmit={handleSubmit}
          otp={otp}
          setOtp={setOtp}
          setShowModal={setShowModal}
        />
      )}
    

      <div className="h-fit w-screen   flex flex-col items-center justify-center gap-5 md:w-1/2">
        <form
          action=""
          className="h-7/12 w-8/12 flex flex-col gap-5 "
          onSubmit={handleSubmit}
        >
          <div className="w-full h-fit flex items-center justify-center gap-10 ">
            <img src="/Logo.PNG" alt="lectora-AI" className="h-10 w-10 rounded-full"/>
            <h1 className="bg-linear-to-r from-cyan-500 via-violet-500 to-purple-600 text-transparent bg-clip-text text-4xl font-semibold">Lectora-AI</h1>
          </div>
          <h1 className="bg-linear-to-r from-cyan-500 via-violet-500 to-purple-600 text-transparent bg-clip-text text-2xl font-semibold">
            {page === "Login" ? "Login" : "Create an account"}
          </h1>

          {page === "Login" && (
            <p className="text-gray-500">
              Don't have an account?{" "}
              <span
                className="underline decoration-1 cursor-pointer text-blue-500"
                onClick={() => setPage("Signup")}
              >
                Sign up
              </span>
            </p>
          )}

          {page === "Signup" && (
            <p className="text-gray-500">
              Already have an account?{" "}
              <span
                className="underline decoration-1 cursor-pointer text-blue-500"
                onClick={() => setPage("Login")}
              >
                Log in
              </span>
            </p>
          )}

          {page == "Signup" && (
            <InputFeild
              type={"text"}
              placeholder={"Username"}
              name={"username"}
              value={credential.username}
              onChangeHandler={onChangeHandler}
            />
          )}
          <InputFeild
            type={"text"}
            placeholder={"Email"}
            name={"email"}
            value={credential.email}
            onChangeHandler={onChangeHandler}
          />

          <div className="w-full h-11  flex items-center bg-white rounded-sm">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={"Enter your password"}
              name={"password"}
              value={credential.password}
              onChange={onChangeHandler}
              required
              className="h-full w-11/12 p-4 bg-transparent focus:border-0 outline-0"
            />
            <span
              className="h-full w-1/12 grid place-items-center"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>

          <button className="w-full h-11  flex items-center justify-center bg-linear-to-r from-cyan-500 via-violet-500 to-purple-600 rounded-sm cursor-pointer text-white">
            {page == "Signup" ? "Create Account" : "Login"}
          </button>
        </form>
        {disable === false && (
          <div className="w-8/12 h-fit">
            <span
              onClick={() => setShowModal(true)}
              className="text-blue-300 hover:underline cursor-pointer"
            >
              Enter Otp &rarr;
            </span>
          </div>
        )}
        <div className="flex w-8/12 h-11 items-center justify-between">
          <hr className="height-1/2 bg-violet-500 w-1/4" /> or Continue with{" "}
          <hr className="height-1/2 bg-violet-500 w-1/4" />
        </div>
        <button
          onClick={googleLogin}
          className="w-8/12 h-11 border-white text-violet  flex items-center justify-center gap-2 bg-transparent border-1 rounded-sm cursor-pointer"
        >
          <FcGoogle className="text-2xl" /> Google
        </button>
      </div>


    </div>
  );
}

export default Auth;
