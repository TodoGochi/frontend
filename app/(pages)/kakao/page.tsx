"use client";

import axios from "axios";
import { headers } from "next/headers";

import { useEffect, useState } from "react";

export default function Page() {
  const [code, setCode] = useState<any>("");
  useEffect(() => {
    setCode(new URL(document.location.toString()).searchParams.get("code")); // 이상한코드가한가득
    const res = axios.post(
      `https://todogochi.store/auth/sign-in/kakao`,
      {
        authCode: code,
      },
      { withCredentials: true }
    );
  }, []);

  return <div>{code}</div>;
}
