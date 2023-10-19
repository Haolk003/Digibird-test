import { useState } from "react";

import api from "../utils/fetchApi";

const useEditShippingAddress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const sendRequest = async (id, addressData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setError(null);
      //gọi api
      const response = await api.put(
        `https://test-pos.digibird.io/api/v1/front/self/address/${id}`,
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

export default useEditShippingAddress;
