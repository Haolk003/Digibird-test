import { useState } from "react";

import api from "../utils/fetchApi";

const useAddShippingAddress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const sendRequest = async (addressData) => {
    try {
      setIsLoading(true);
      //cập nhật lại các thành phần
      setIsSuccess(false);
      setError(null);
      const response = await api.post(
        "https://test-pos.digibird.io/api/v1/front/self/address",
        addressData
      );
      const data = response.data.data;
      if (data) {
        setIsSuccess(true);
        setData(data);
      }
    } catch (err) {
      setError(err.response.data);
    }
    setIsLoading(false);
  };
  return { isLoading, error, sendRequest, data, isSuccess };
};

export default useAddShippingAddress;
