"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div>TODO 고치</div>
      <div>
        <button onClick={() => router.push("/signin")}>로그인하기</button>
      </div>
    </div>
  );
}
