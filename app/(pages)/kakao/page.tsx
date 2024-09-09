"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [code, setCode] = useState<any>("");
  useEffect(() => {
    const myCode = new URL(document.location.toString()).searchParams.get(
      "code"
    );
    setCode(myCode); // 이상한코드가한가득
  }, [code]);

  return <div></div>;
}
