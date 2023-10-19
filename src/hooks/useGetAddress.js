import { useState } from "react";

import { useSetRecoilState } from "recoil";

import addressState from "../recoil/addressState";
import api from "../utils/fetchApi";
const useGetAddress = () => {
  const setAddressState = useSetRecoilState(addressState);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(
        "https://test-pos.digibird.io/api/v1/front/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country"
      );
      const data = response.data.data;

      if (data) {
        setData(data);
        setAddressState(data);
      }
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };
  return { isLoading, error, sendRequest, data };
};

export default useGetAddress;
