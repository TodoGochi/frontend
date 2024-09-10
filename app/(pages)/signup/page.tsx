"use client";

import axios from "axios";
import { useState } from "react";

export default function Page() {
  const [use, setUse] = useState(false);
  const [person, setPerson] = useState(false);

  const [email, setEmail] = useState("");
  const [emailGood, setEmailGood] = useState(false);
  const [duplicated, setDuplicated] = useState(true);
  const [check, setCheck] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordGood, setPasswordGood] = useState(true);

  const [nickname, setNickname] = useState("");

  const clickHandler = () => {
    if (
      use &&
      person &&
      validatePassword(password) &&
      validateEmail(email) &&
      password === passwordConfirm &&
      nickname.length > 0
    ) {
    }
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const emailChangeHandler = (e: any) => {
    setCheck(false);
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setEmailGood(true);
    } else {
      setEmailGood(false);
    }
  };

  const validatePassword = (password: string) => {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordPattern.test(password);
  };

  const passwordChangeHandler = () => {
    if (!validatePassword(password)) {
      setPasswordGood(false);
    } else {
      setPasswordGood(true);
    }
  };

  const checkDuplicated = async () => {
    try {
      const res: any = await axios.post(
        "https://todogochi.store/auth/email-check",
        { email },
        { withCredentials: true }
      );
      if (res.data.isAvailable) {
        setDuplicated(false);
      } else {
        setDuplicated(true);
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      setCheck(true);
    }
  };
  return (
    <div>
      <div className="bg-[#ededed] h-screen flex justify-center items-center">
        <div className="w-[390px] max-xs:w-full max-xs:h-full h-[844px] flex flex-col justify-center mx-auto items-center">
          <div className="text-[#3f3f3f] w-[350px] text-[25px] font-normal font-neodunggeunmo mb-[50px]">
            잠깐!
            <br />할 일을 적기 전에...
          </div>
          <div className="w-[350px] text-[rgb(63,63,63)] text-xs font-normal font-neodunggeunmo mb-[10px]">
            이메일
          </div>
          <div className="flex">
            <input
              value={email}
              onChange={(e) => emailChangeHandler(e)}
              placeholder="example@example.com"
              className="p-[10px] w-[265px] h-[45px] text-[15px] font-normal font-['SUIT']  rounded-lg mr-[10px]"
            />
            <div
              className={` flex justify-center items-center w-[75px] h-[45px] rounded-lg cursor-pointer ${
                emailGood ? "bg-[#3F3F3F]" : "bg-[#999999]"
              }`}
              onClick={checkDuplicated}
            >
              <div className="text-[#f2f2f2] text-xs font-normal font-neodunggeunmo">
                중복확인
              </div>
            </div>
          </div>
          {!duplicated && emailGood && check && (
            <div className="w-[350px] h-2.5 text-[#11b729] text-[10px] font-normal font-['SUIT'] mt-[5px]">
              사용 가능한 이메일 입니다.
            </div>
          )}

          <div className="w-[350px]  text-[#3f3f3f] text-xs font-normal font-neodunggeunmo mt-[20px] mb-[5px]">
            비밀번호
          </div>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordGood(true);
            }}
            onBlur={passwordChangeHandler}
            placeholder="비밀번호를 입력하세요."
            className="p-[10px] w-[350px] h-[45px] text-[15px] font-normal font-['SUIT'] rounded-lg mr-[10px] mb-[5px]"
          />
          {passwordGood ? (
            <div className="w-[350px] h-2.5 text-[#999999] text-[10px] font-light font-['SUIT'] mb-[20px]">
              8자 이상, 영문, 숫자, 특수문자 반드시 포함
            </div>
          ) : (
            <div className="w-[350px] h-2.5 text-[#f93629] text-[10px] font-normal font-['SUIT'] mb-[20px]">
              비밀번호 조건을 다시 확인해주세요.
            </div>
          )}

          <div className="w-[350px] mb-[10px] text-[#3f3f3f] text-xs font-normal font-neodunggeunmo">
            비밀번호 확인
          </div>
          <input
            placeholder="비밀번호를 입력하세요."
            className="p-[10px] w-[350px] h-[45px] text-[15px] font-normal font-['SUIT'] mb-[20px] rounded-lg mr-[10px]"
          />
          <div className="w-[350px] mb-[10px] text-[#3f3f3f] text-xs font-normal font-neodunggeunmo">
            닉네임
          </div>

          <input
            placeholder="닉네임을 입력하세요"
            className="p-[10px] w-[350px] h-[45px] text-[15px] font-normal font-['SUIT']  rounded-lg mr-[10px] mb-[5px]"
          />
          <div className="w-[350px] h-2.5 text-[#999999] text-[10px] font-light font-['SUIT'] mb-[20px]">
            최소 2자 최대 15자, 알파벳, 숫자, 한글 가능
          </div>
          <div
            onClick={() => setUse(!use)}
            className="flex w-[390px] ml-[45px] mt-[32px] relative cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                id="check box - nor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 0H2V1H1V2H0V18H1V19H2V20H18V19H19V18H20V2H19V1H18V0ZM19 2H18V1H2V2H1V18H2V19H18V18H19V2Z"
                fill="#4D4D4D"
              />
            </svg>
            {use && (
              <svg
                className="absolute top-[3px] left-[3px]"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path d="M13 1V0H1V1H0V13H1V14H13V13H14V1H13Z" fill="#4C4C4C" />
              </svg>
            )}

            <div className="ml-[10px] ">
              <span className="text-[#3f3f3f] text-xs font-bold font-['SUIT']">
                이용약관
              </span>
              <span className="text-[#3f3f3f] text-xs font-normal font-['SUIT']">
                에 동의합니다.
              </span>
            </div>
          </div>

          <div
            className="flex w-[390px] ml-[45px] mt-[20px] relative cursor-pointer"
            onClick={() => setPerson(!person)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                id="check box - nor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 0H2V1H1V2H0V18H1V19H2V20H18V19H19V18H20V2H19V1H18V0ZM19 2H18V1H2V2H1V18H2V19H18V18H19V2Z"
                fill="#4D4D4D"
              />
            </svg>
            {person && (
              <svg
                className="absolute top-[3px] left-[3px]"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path d="M13 1V0H1V1H0V13H1V14H13V13H14V1H13Z" fill="#4C4C4C" />
              </svg>
            )}

            <div className="ml-[10px]">
              <span className="text-[#3f3f3f] text-xs font-bold font-['SUIT']">
                개인정보처리방침
              </span>
              <span className="text-[#3f3f3f] text-xs font-normal font-['SUIT']">
                에 동의합니다.
              </span>
            </div>
          </div>

          <div
            onClick={clickHandler}
            className="w-[350px] h-[45px] bg-[#999999] rounded-lg flex justify-center items-center mt-[30px]"
          >
            <div className="w-[70px] h-4 text-center text-[#f2f2f2] text-base font-normal font-neodunggeunmo">
              시작하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
