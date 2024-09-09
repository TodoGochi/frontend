"use client";

import axios from "axios";

import { useEffect, useState } from "react";

export default function Page() {
  const [code, setCode] = useState<any>("");
  useEffect(() => {
    setCode(new URL(document.location.toString()).searchParams.get("code")); // 이상한코드가한가득
  }, []);

  return <div>{code}</div>;
}
