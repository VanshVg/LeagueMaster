import {
  ILoginApiData,
  IRegisterApiData,
  IResetPasswordApiData,
  IVerifyUsernameApiData,
} from "../../types/types";
import useAxios from "../useAxios";

const useAuthServices = () => {
  const { callApi, isSuccess, isError, isLoading } = useAxios();

  const registerApi = async (values: IRegisterApiData) => {
    return callApi({ url: "/auth/register", method: "POST", data: values, params: {} });
  };

  const loginApi = async (values: ILoginApiData) => {
    return callApi({ url: "/auth/login", method: "POST", data: values, params: {} });
  };

  const activateApi = (verificationToken: string) => {
    return callApi({
      url: `/auth/activate/${verificationToken}`,
      method: "PUT",
      data: {},
      params: {},
    });
  };

  const verifyUsernameApi = async (values: IVerifyUsernameApiData) => {
    return callApi({ url: "/auth/verify", method: "POST", data: values, params: {} });
  };

  const resetPasswordApi = async (values: IResetPasswordApiData, resetToken: string) => {
    return callApi({ url: `/auth/reset/${resetToken}`, method: "PUT", data: values, params: {} });
  };

  return {
    registerApi,
    loginApi,
    activateApi,
    verifyUsernameApi,
    resetPasswordApi,
    isSuccess,
    isError,
    isLoading,
  };
};

export default useAuthServices;
