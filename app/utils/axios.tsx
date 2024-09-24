import axios from "axios";

const tokenRefresh = async () => {
  try {
    const response = await axios.post(
      "https://todogochi.store/auth/refresh",
      {},
      { withCredentials: true }
    );

    // 새 액세스 토큰을 응답에서 받아 저장
    const newAccessToken = response.data.accessToken; // 실제 응답 구조에 따라 조정 필요
    localStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("토큰 리프레시 실패:", error);
    // 리프레시 실패 시 로그아웃 처리 또는 다른 에러 처리
    throw error;
  }
};

export const instance = axios.create({
  baseURL: "https://todogochi.store",
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
