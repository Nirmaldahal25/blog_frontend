import { createContext, useState, useEffect } from "react";
import apiAxios from "../../utils/api";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(
    localStorage.getItem("token") === null
      ? 0
      : JSON.parse(localStorage.getItem("token"))
  );
  const [user, setUser_] = useState(0);

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const setUser = (newUser) => {
    setUser_(newUser);
  };

  const fetchUser = async () => {
    try {
      const { data } = await apiAxios.get("/auth/user/");
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    delete apiAxios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    setUser(0);
    setToken(0);
  };

  const context = {
    token: token,
    setToken: setToken,
    //set user
    user: user,
    setUser: setUser,
    fetchUser: fetchUser,
    logOut: logOut,
  };

  useEffect(() => {
    const responseInterceptor = apiAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          try {
            if (token) {
              const { data } = await apiAxios.post("auth/token/refresh/", {
                refresh: token.refresh,
              });
              const newtoken = {
                ...token,
                access: data.access,
              };
              setToken(newtoken);
              localStorage.setItem("token", JSON.stringify(newtoken));
              apiAxios.defaults.headers.common["Authorization"] =
                "Bearer " + token.access;

              const originalRequest = error.config;
              originalRequest.headers["Authorization"] =
                "Bearer " + token.access;

              return apiAxios(originalRequest);
            }
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
    if (token) {
      fetchUser();
    }
    return () => {
      apiAxios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
