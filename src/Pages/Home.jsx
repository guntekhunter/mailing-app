import React from "react";
import Button from "../Component/UiComponent/Buttons/Button";
import Text from "../Component/UiComponent/Text/TextColor";
import Inputs from "../Component/UiComponent/Inputs/Inputs";
import Ipassword from "../Component/UiComponent/Inputs/Ipassword";
import SignInImage from "../Assets/SignInLogo.png";
import Logo from "../Assets/Logo Upana.png";
import Footer from "../Component/UiComponent/Footer";
import Card from "../Component/UiComponent/Card";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../Fetch/Fetch";
import { redirect } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [empty, setEmpty] = useState(true);
  const [isRequiredEmail, setIsRequiredEmail] = useState(false);
  const [isRequiredPassword, setIsRequiredPassword] = useState(false);
  const [redirectPages, setRedirectPages] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setIsRequiredEmail(false);
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setIsRequiredPassword(false);
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };
    if (!email) {
      setIsRequiredEmail(true);
    }
    if (!password) {
      setIsRequiredPassword(true);
    }
    await login(data)
      .then((res) => {
        setTimeout(() => {
          localStorage.setItem("isLogin", true);
          setToken(res.accessToken);
          navigate("/persuratan");
          localStorage.setItem("user", data.email);
        });
      })
      .catch((err) => {
        setEmpty(false);
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  console.log(localStorage.getItem("token"));
  console.log(localStorage.getItem("isLogin"));
  return (
    <section>
      <div className="Home grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
          <img className="w-full h-screen object-cover" src={SignInImage}></img>
        </div>
        <div className="flex flex-col justify-center h-screen">
          <div className="logo t-0">
            <img className="pt-5 pl-6 w-[8rem]" src={Logo} />
          </div>
          <div className="form flex justify-center h-full">
            <div className="form-container flex flex-col space-y-2 grid content-around">
              <div action="" className="space-y-4">
                <div className="header">
                  <div className="header-container w-2">
                    <p className="text-[2rem] font-bold text-[#333333] tracking-tight leading-9 mb-2">
                      Selamat Datang
                    </p>
                  </div>
                  <Text
                    item="Silahkan masuk untuk melanjutkan"
                    color="secondary"
                  />
                </div>

                <div className="flex flex-col input-label-container space-y-1">
                  <Text htmlFor="" color="primary" item="Email" />
                  {/* if error */}
                  {/* <Inputs itype="error"/> */}
                  {/* if Success */}
                  <Inputs
                    itype="primary"
                    Ticon="hidden"
                    onChange={handleEmail}
                  />
                  <Text
                    color="errorLight"
                    item="Email is Required"
                    className={`${!isRequiredEmail && "hidden"}`}
                  />
                </div>
                <div className="flex flex-col input-label-container space-y-1">
                  <Text htmlFor="" color="primary" item="Password" />
                  <Ipassword onChange={handlePassword} />
                  <Text
                    color="errorLight"
                    item="Password is Required"
                    className={`${!isRequiredPassword && "hidden"}`}
                  />
                  <Text
                    color="errorLight"
                    item="password/email salah"
                    className={`${empty && "hidden"}`}
                  />
                </div>
                <div>
                  {/* <Link to={"/persuratan"}> */}
                  <Button
                    type="primary"
                    className="w-full"
                    item="Masuk"
                    onClick={handleLogin}
                  />
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
          <Footer>2020 - Upana Studio. All rights reserved</Footer>
        </div>
      </div>
    </section>
  );
}
