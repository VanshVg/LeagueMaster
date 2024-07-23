import axios from "axios";
import { useState } from "react";

import { axiosInstance } from "../config/Axios";
import { IAxios } from "../types/types";

const useAxios = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const callApi = async ({ url, method, data = {}, params = {} }: IAxios) => {
    setIsError(false);
    setIsSuccess(false);
    setIsLoading(true);
    try {
      const result = await axiosInstance({ url, method, data, params });
      if (result.data.type === "success") {
        setIsSuccess(true);
      }
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsError(true);
        return error.response?.data;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { callApi, isError, isSuccess, isLoading };
};

export default useAxios;
