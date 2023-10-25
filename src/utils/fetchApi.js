import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

const api = axios.create({
  baseURL: "https://test-pos.digibird.io/api/v1/front/self/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  },
  withCredentials: false,
});

api.interceptors.response.use(
  // nếu giá trị trả về đúng thì tiếp tục
  async (response) => {
    return response;
  },
  async (error) => {
    // Lấy lại đã hết hạn và gắn vào lại localstorage với lỗi là  UNAUTHORIZED EXCEPTION
    if (error.response?.data?.error?.message === "UNAUTHORIZED EXCEPTION") {
      try {
        //thêm data vào x-www-form-urlencoded
        const params = new URLSearchParams();
        params.append("id", "0869017747");
        params.append("name", "Phát");
        params.append("company_id", "9");
        //đăng nhập
        const response = await axios.post(
          "https://test-pos.digibird.io/api/v1/front/sign-up-zalo",
          params,
          {
            headers: { "content-type": "application/x-www-form-urlencoded" },
          }
        );

        const data = response.data.data;
        //set lại vào localstorage
        localStorage.setItem("token", JSON.stringify(data.token));
        // refesh lại api vừa mới gọi
        return await api({
          url: error.config.url,
          method: error.config.method,
          headers: { Authorization: `bearer ${data.token}` },
        });
      } catch (err) {
        return Promise.reject(err);
      }
    }
    // Những lỗi khác thì tiếp tục
    return Promise.reject(error);
  }
);
export default api;
