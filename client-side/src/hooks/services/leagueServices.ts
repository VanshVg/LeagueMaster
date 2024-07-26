import useAxios from "../useAxios";

const useLeagueServices = () => {
  const { callApi, isSuccess, isError, isLoading } = useAxios();

  const fetchUserLeaguesApi = () => {
    return callApi({ url: "/leagues", method: "GET", data: {}, params: {} });
  };

  return { fetchUserLeaguesApi, isSuccess, isError, isLoading };
};

export default useLeagueServices;
