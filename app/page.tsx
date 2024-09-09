import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div>TODO 고치</div>
      <div>
        <button onClick={() => router.push("/signin")}>로그인하기</button>
      </div>
    </>
  );
}
