/* eslint-disable @next/next/no-img-element */

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (
      accessToken !== null &&
      accessToken !== "" &&
      accessToken !== "undefined"
    ) {
      router.push("/tutorial");
    }
  }, [router]);

  const loginByEmail = async () => {
    try {
      const res: any = await axios.post(
        "https://todogochi.store/auth/sign-in",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      localStorage.setItem("accessToken", res.data.accessToken);
      router.push("/tutorial");
    } catch (e) {
      console.log(e);
    }
  };

  const loginKakao = () => {
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;
    window.location.href = link;
  };

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="bg-[#ededed] w-[390px] max-xs:w-full max-xs:h-full h-[844px] flex flex-col justify-center mx-auto items-center">
        <div className="flex justify-start pl-[10px] w-full">
          <svg
            className="w-[136px] h-[32px] mb-[13px]"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="140"
            height="24"
            viewBox="0 0 140 24"
            fill="none"
          >
            <rect width="140" height="24" fill="url(#pattern0_358_5329)" />
            <defs>
              <pattern
                id="pattern0_358_5329"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_358_5329"
                  transform="matrix(0.00540541 0 0 0.0315315 0 -0.0045045)"
                />
              </pattern>
              <image
                id="image0_358_5329"
                width="185"
                height="32"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAAAgCAYAAABOxNnXAAAACXBIWXMAAAsTAAALEwEAmpwYAAACUklEQVR4nO2cW26DMBBFoerCzD/LYRksh/94Z/TLdGT5MWZm7CTcI6G2iXFcfHrrB8l8nucEwDfzO7oBn4hzTiUZvPezRj2gzM/oBnwaWoJr1wXyzBiu8KFSeu+ldV3fI9FtQZIz0RQ8rgOJbgskb+SO4M6565DWBdpJTjyXZREly+v1Mv33G7fP+vUkRMMS1bq5/fRO10er71rqweqKkJLEloIDPknJc38Vn5SgvfDeXzI75y6ZeyZ4rb/C16f2F8bkCkSTSCT4m4HhihI00eljI/nm5G753ZDkilCpRwsO/jFJcumsX7q6Y7nqQMfdKVrkjpO/J736iHuNc/XF53PLUZDkTOiupIac2PHsR9O2fm1W3zrrj8uNPp9DbXeytIyYKd8seGs/0HKjr/HdxL7r2jRh4tlMkDIne24ZMVcPsAeS3yQlaRA/scrSVehaavZsg1Y5CRiTK5KSOSe4c+4Mh33Lng0kV4ZKXRK89DPQBZIb4L2fOYJv29avUQ8GknckdU96EB1pbgcmng3kRGydWAbB13WdjuOQNwwUQZIzKSUtZwIZnk/tiH5jmi/LctJjZFuQ5Axqb32T7IAize1R3fHMlcuhde8Kd8eP+/oU7ns7OaLnzj+OY9r3PZRhD30k12nUvSvau9KcckhyJrGgNH3Xde3cGtACPpKiQm4sHZJ72zax5HeTHPDAxJPJyNtigQxIXiF1iy1NcSmYdNoDyRmkRA+Ch6FK6nNV6Dmp5yB4HyA5k9RWvdaEE+NxW7C6cpNY8Pgd+/Tx0tIjBLfnDzRVsQyyCTQ/AAAAAElFTkSuQmCC"
              />
            </defs>
          </svg>
        </div>
        <div className="flex justify-start w-full pl-[10px]">
          <div className="text-[#3f3f3f] text-[35px] font-normal font-neodunggeunmo mb-[35px]">
            오늘의 할 일은?
          </div>
        </div>
        <div className="w-[350px] mb-[10px] text-[#3f3f3f] text-xs font-normal font-neodunggeunmo">
          이메일
        </div>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@example.com"
          className="p-[10px] w-[350px] h-[45px] text-[15px] font-normal font-['SUIT'] mb-[20px] rounded-lg"
        />
        <div className="w-[350px] text-[#3f3f3f] text-xs font-normal font-neodunggeunmo mb-[10px]">
          비밀번호
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          className="p-[10px] bg-[#FAFAFA] w-[350px] h-[45px] text-[15px] font-normal font-['SUIT'] mb-[30px] rounded-lg"
        />
        <div
          onClick={loginByEmail}
          className="w-[350px] h-[45px] relative bg-[#3f3f3f] rounded-lg cursor-pointer flex justify-center items-center"
        >
          <div className="  text-[#f2f2f2] text-base font-normal font-neodunggeunmo">
            로그인
          </div>
        </div>

        <div
          onClick={() => router.push("/signup")}
          className="w-[350px] h-[45px] relative bg-[#f9f9f9] rounded-lg cursor-pointer mt-[15px] mb-[50px] flex justify-center items-center"
        >
          <div className="   text-[#3f3f3f] text-base font-normal font-neodunggeunmo">
            회원가입
          </div>
        </div>

        <div className="flex justify-center text-[#7f7f7f] text-xs font-normal font-neodunggeunmo mb-[10px] w-[350px]">
          SNS 계정으로 간편하게 로그인
        </div>
        <div
          className="w-[350px] h-[45px] px-3.5 bg-[#fee500] rounded-md justify-center items-center inline-flex cursor-pointer"
          onClick={loginKakao}
        >
          <div className="px-[82px] justify-center items-center gap-2 flex">
            <div className="w-[18px] h-[18px] relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
              >
                <g id="ì¹´ì¹´ì¤ ë¡ê³ " clipPath="url(#clip0_90_76)">
                  <path
                    id="Path"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.00002 1.09998C4.02917 1.09998 0 4.21293 0 8.05226C0 10.44 1.5584 12.5449 3.93152 13.7969L2.93303 17.4445C2.84481 17.7668 3.21341 18.0237 3.49646 17.8369L7.87334 14.9482C8.2427 14.9838 8.61808 15.0046 9.00002 15.0046C13.9705 15.0046 17.9999 11.8918 17.9999 8.05226C17.9999 4.21293 13.9705 1.09998 9.00002 1.09998"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_90_76">
                    <rect
                      width="17.9999"
                      height="18"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="text-black/90 text-[15px] font-semibold font-['Apple SD Gothic Neo'] leading-snug">
              카카오 로그인
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
