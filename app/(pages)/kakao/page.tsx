"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { instance } from "@/app/utils/axios";

export default function Page() {
  const router = useRouter();

  const getCode = async () => {
    const myCode = new URL(document.location.toString()).searchParams.get(
      "code"
    );

    const res = await instance.post(
      `/auth/sign-in/kakao?code=${myCode}`,
      {},
      { withCredentials: true }
    );

    localStorage.setItem("accessToken", res.data.accessToken);
    router.push("/main");
  };

  useEffect(() => {
    getCode();
  }, []);

  return <div></div>;
}
