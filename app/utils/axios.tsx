import axios from "axios";

const tokenRefresh = async () => {
  await axios.post(
    "https://todogochi.store/auth/refresh",
    {},
    { withCredentials: true }
  );
};

export const instance = axios.create({
  // 상대적인 URL을 인스턴스 메서드에 전달하려면 baseURL을 설정하는 것은 편리하다.
  // URL(서버 주소) 예시 - http://127.0.0.1:5500
  baseURL: "https://todogochi.store",
  // 요청이 timeout보다 오래 걸리면 요청이 중단된다.
  timeout: 4000,
});

instance.interceptors.request.use(
  (config) => {
    // getToken() - 클라이언트에 저장되어 있는 액세스 토큰을 가져오는 함수
    const accessToken = localStorage.getItem("accessToken");

    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // isTokenExpired() - 토큰 만료 여부를 확인하는 함수
      // tokenRefresh() - 토큰을 갱신해주는 함수
      await tokenRefresh();

      const accessToken = localStorage.getItem("accessToken");

      error.config.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
      const response = await axios.request(error.config);
      return response;
    }
    return Promise.reject(error);
  }
);
