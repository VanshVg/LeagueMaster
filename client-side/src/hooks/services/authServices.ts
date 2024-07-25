import { ILoginApiData, IRegisterApiData } from "../../types/types";
import useAxios from "../useAxios";

const useAuthServices = () => {
  const { callApi, isSuccess, isError, isLoading } = useAxios();

  const registerApi = async (values: IRegisterApiData) => {
    return await callApi({ url: "/auth/register", method: "POST", data: values, params: {} });
  };

  const loginApi = async (values: ILoginApiData) => {
    return await callApi({ url: "/auth/login", method: "POST", data: values, params: {} });
  };

  return { registerApi, loginApi, isSuccess, isError, isLoading };
};

export default useAuthServices;
