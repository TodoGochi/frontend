/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/signin");
    }, 3000);
  }, [router]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <img src="/splash.gif" alt="splash" />
    </div>
  );
}
